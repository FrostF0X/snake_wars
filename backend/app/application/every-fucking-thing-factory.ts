import { DirectionUtils } from "../game/basic/direction-utils";
import Point from "../game/basic/point";
import Board from "../game/board/board";
import Game from "../game/game";
import { PlayerFactory } from "../game/player/player-factory";
import PlayersCollection from "../game/player/players-collection";
import { PlayersResolver } from "../game/player/players-resolver";
import Snake from "../game/snake/snake";
import SnakeFactory from "../game/snake/snake-factory";
import Server = SocketIO.Server;
import InitialWallConfiguration from "../game/wall/initial-wall-configuration";
import Wall from "../game/wall/wall";
import AlgorithmLoader from "./algorithm-loader";
import { INDEX_FILE, INITIAL_SNAKES_DATA, INITIAL_WALLS_DATA, SIZE, SNAKES_DIR, TIMEOUT } from "./configuration";

// used int index.js file
// noinspection JSUnusedGlobalSymbols
export default class EveryFuckingThingFactory {

    public createGame(io: Server): Game {
        const players: PlayersCollection = this.createPlayers();
        const snakes: Snake[] = players.getSnakes();

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

        let lastPoint: Point = configuration.getStart();

        for (let i: number = 0; i < configuration.getLength(); i++) {
            lastPoint = DirectionUtils.createMovedPointInDirection(
                lastPoint, DirectionUtils.getOpposite(configuration.getDirection())
            );
            bounds.push(lastPoint);
        }

        return new Wall(bounds);
    }

    private createPlayers(): PlayersCollection {
        const snakeFactory: SnakeFactory = new SnakeFactory();
        const playerFactory: PlayerFactory = new PlayerFactory(snakeFactory, SIZE, TIMEOUT);
        const algorithmLoader: AlgorithmLoader = new AlgorithmLoader(SNAKES_DIR, INDEX_FILE);
        const playersResolver: PlayersResolver =
            new PlayersResolver(algorithmLoader, playerFactory, INITIAL_SNAKES_DATA);
        return playersResolver.resolve();
    }
}
