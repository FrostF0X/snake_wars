import { DirectionUtils } from "../logic/direction-utils";
import AlgorithmLoader from "./algorithm-loader";
import Board from "./board";
import { INDEX_FILE, INITIAL_SNAKES_DATA, INITIAL_WALLS_DATA, SIZE, SNAKES_DIR, TIMEOUT } from "./configuration";
import Game from "./game";
import InitialSnakeConfiguration from "./initial-snake-configuration";
import Server = SocketIO.Server;
import InitialWallConfiguration from "./initial-wall-configuration";
import Player from "./player";
import PlayerAlgorithm from "./player-algorithm";
import PlayerAlgorithmConfiguration from "./player-algorithm-configuration";
import PlayerAlgorithmConstructor from "./PlayerAlgorithmConstructor";
import PlayersCollection from "./players-collection";
import Point from "./point";
import Snake from "./snake";
import Wall from "./wall";

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
