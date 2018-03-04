import { DirectionUtils } from "../game/basic/direction-utils";
import Point from "../game/basic/point";
import Board from "../game/board/board";
import Game from "../game/game";
import Player from "../game/player/player";
import PlayerAlgorithm from "../game/player/player-algorithm";
import PlayerAlgorithmConfiguration from "../game/player/player-algorithm-configuration";
import PlayerAlgorithmConstructor from "../game/player/player-algorithm-constructor";
import PlayersCollection from "../game/player/players-collection";
import InitialSnakeConfiguration from "../game/snake/initial-snake-configuration";
import Snake from "../game/snake/snake";
import Server = SocketIO.Server;
import InitialWallConfiguration from "../game/wall/initial-wall-configuration";
import Wall from "../game/wall/wall";
import AlgorithmLoader from "./algorithm-loader";
import { INDEX_FILE, INITIAL_SNAKES_DATA, INITIAL_WALLS_DATA, SIZE, SNAKES_DIR, TIMEOUT } from "./configuration";

// used int index.js file
// noinspection JSUnusedGlobalSymbols
export default class EveryFuckingThingFactory {

    public createAlgorithm(index: number,
                           initialSnakeConfiguration: InitialSnakeConfiguration,
                           playerAlgorithmConstructor: PlayerAlgorithmConstructor): PlayerAlgorithm {
        return new playerAlgorithmConstructor({
            board: SIZE,
            start: initialSnakeConfiguration,
            timeout: TIMEOUT,
            type: "snake",
            you: index,
        });
    }

    public createSnake(index: number, configuration: InitialSnakeConfiguration): Snake {
        const head: Point = configuration.getHead();
        const body: Point[] = [];
        for (let i: number = 0; i < configuration.getLength(); i++) {
            body.push(DirectionUtils.createMovedPointInDirection(
                head, DirectionUtils.getOpposite(configuration.getDirection())
            ));
        }
        return new Snake(index, head, body, configuration.getDirection());
    }

    public createGame(io: Server): Game {
        const players: PlayersCollection = this.createPlayers();
        const snakes: Snake[] = this.getPlayersSnakes(players);

        return new Game(this.createBoard(snakes), players, TIMEOUT, io);
    }

    public createBoard(snakes: Snake[]): Board {
        return new Board(this.createWalls(), snakes, SIZE);
    }

    public createWalls(): Wall[] {
        return INITIAL_WALLS_DATA.map((configuration: InitialWallConfiguration) => {
            return this.createWall(configuration);
        });
    }

    public createWall(configuration: InitialWallConfiguration): Wall {
        const bounds: Point[] = [configuration.getStart()];

        for (let i: number = 0; i < configuration.getLength(); i++) {
            bounds.push(DirectionUtils.createMovedPointInDirection(
                configuration.getStart(), DirectionUtils.getOpposite(configuration.getDirection())
            ));
        }

        return new Wall(bounds);
    }

    public createPlayers(): PlayersCollection {
        const algorithmsConfigurations: PlayerAlgorithmConfiguration[] = AlgorithmLoader.load(SNAKES_DIR, INDEX_FILE);
        const maxSnakes: number = INITIAL_SNAKES_DATA.length;

        if (algorithmsConfigurations.length > maxSnakes) {
            throw new Error(`I refuse to let more than ${maxSnakes} snakes to the game! Don't ask me why ;-(`);
        }

        const players: Player[] = algorithmsConfigurations.map(
            (algorithmConfiguration: PlayerAlgorithmConfiguration, index: number) => {
                const algorithmConstructor: PlayerAlgorithmConstructor = algorithmConfiguration.getConstructor();
                const name: string = algorithmConfiguration.getName();
                const initialSnakeConfiguration: InitialSnakeConfiguration = this.getInitialSnakeData(index);

                return new Player(
                    name,
                    this.createAlgorithm(index, initialSnakeConfiguration, algorithmConstructor),
                    this.createSnake(index, initialSnakeConfiguration)
                );
            });

        return new PlayersCollection(players);
    }

    public getPlayersSnakes(players: PlayersCollection): Snake[] {
        return players.getSnakes();
    }

    public getInitialSnakeData(index: number): InitialSnakeConfiguration {
        return INITIAL_SNAKES_DATA[index];
    }
}
