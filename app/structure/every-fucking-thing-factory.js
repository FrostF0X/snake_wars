import {Direction} from "../logic/direction";
import Snake from "./snake";
import Board from "./board";
import Player from "./player";
import {INITIAL_SNAKES, INITIAL_WALLS, PLAYERS_ALGORITHMS, SIZE, TIMEOUT} from "./configuration";
import PlayerCollection from "./player-collection";
import Game from "./game";
import Wall from "./wall";

export default class EveryFuckingThingFactory {

    createPlayersAlgorithm(index, snakeSettings, Algorithm) {
        return new Algorithm({
            type: "snake",
            start: snakeSettings,
            timeout: TIMEOUT,
            board: SIZE,
            you: index,
        });
    }

    createSnakeFromConfiguration(index, configuration) {
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
        return new PlayerCollection([
            new Player(0, "andrzej", this.createAlgorithmForPlayer(0), this.createSnakeForPlayer(0)),
            new Player(1, "maciek", this.createAlgorithmForPlayer(1), this.createSnakeForPlayer(1)),
            new Player(2, "mwl", this.createAlgorithmForPlayer(2), this.createSnakeForPlayer(2))
        ]);
    }


    getPlayersSnakes(players) {
        return players.getSnakes();
    }

    createSnakeForPlayer(index) {
        return this.createSnakeFromConfiguration(index, this.getSnakeConfigForPlayer(index));
    }

    createAlgorithmForPlayer(index) {
        return this.createPlayersAlgorithm(index, this.getSnakeConfigForPlayer(index), this.getAlgorithmForPlayer(index));
    }

    getSnakeConfigForPlayer(index) {
        return INITIAL_SNAKES[index];
    }

    getAlgorithmForPlayer(index) {
        return PLAYERS_ALGORITHMS[index];
    }
}