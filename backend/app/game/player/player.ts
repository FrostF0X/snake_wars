import Board from "../board/board";
import Snake from "../snake/snake";
import PlayerAlgorithm from "./player-algorithm";

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
