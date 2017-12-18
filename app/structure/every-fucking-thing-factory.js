import {Direction} from "../logic/direction";
import Snake from "./snake";
import Board from "./board";
import Player from "./player";
import {INITIAL_SNAKES_DATA, INITIAL_WALLS, SIZE, TIMEOUT, SNAKES_DIR, INDEX_FILE} from "./configuration";
import PlayerCollection from "./player-collection";
import Game from "./game";
import Wall from "./wall";
import AlgorithmLoader from "./algorithm-loader";

export default class EveryFuckingThingFactory {

    createAlgorithm(index, configuration, Algorithm) {
        return new Algorithm({
            type: "snake",
            start: configuration,
            timeout: TIMEOUT,
            board: SIZE,
            you: index,
        });
    }

    createSnake(index, configuration) {
        const head = configuration.head;
        const body = [];
        for (let i = 0; i < configuration.length; i++) {
            body.push(Direction.createMovedPointInDirection(head, Direction.getOpposite(configuration.direction)));
        }
        return new Snake(index, head, body, configuration.direction);
    }

    createGame(io) {
        const players = this.createPlayers();
        const snakes = this.getPlayersSnakes(players);

        return new Game(this.createBoard(snakes), players, TIMEOUT, io);
    }

    createBoard(snakes) {
        return new Board(this.createWalls(), snakes, SIZE);
    }

    createWalls() {
        return INITIAL_WALLS.map((configuration) => {
            return this.createWall(configuration);
        });
    }

    createWall(configuration) {
        let bounds = [configuration.start];

        for (let i = 0; i < configuration.length; i++) {
            bounds.push(Direction.createMovedPointInDirection(configuration.start, Direction.getOpposite(configuration.direction)));
        }

        return new Wall(bounds);
    }

    createPlayers() {
        const players = [];
        const algorithms = AlgorithmLoader.load(SNAKES_DIR, INDEX_FILE);
        const maxSnakes = INITIAL_SNAKES_DATA.length;

        if (algorithms.length > maxSnakes) {
            throw new Error(`I refuse to let more than ${maxSnakes} snakes to the game! Don't ask me why ;-(`);
        }

        algorithms.forEach(algorithm => {
            const AlgorithmConstructor = algorithm.constructor;
            const name = algorithm.name;
            const index = players.length;
            const initialSnakeData = this.getInitialSnakeData(index);

            players.push(new Player(
                name,
                this.createAlgorithm(index, initialSnakeData, AlgorithmConstructor),
                this.createSnake(index, initialSnakeData))
            );
        });

        return new PlayerCollection(players);
    }

    getPlayersSnakes(players) {
        return players.getSnakes();
    }

    getInitialSnakeData(index) {
        return INITIAL_SNAKES_DATA[index];
    }
}
