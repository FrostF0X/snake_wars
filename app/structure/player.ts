import Board from "./board";
import PlayerAlgorithm from "./player-algorithm";
import Snake from "./snake";

export default class Player {
    private algorithm: PlayerAlgorithm;

    constructor(private name: string, playerAlgorithm: PlayerAlgorithm, private snake: Snake) {
        this.algorithm = playerAlgorithm;
    }

    public move(board: Board): string {
        try {
            return this.algorithm.getMove(board.mapToArray());
        } catch (e) {
            return undefined;
        }
    }

    public getName(): string {
        return this.name;
    }

    public getSnake(): Snake {
        return this.snake;
    }
}
