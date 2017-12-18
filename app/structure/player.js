export default class Player {
    constructor(name, playerAlgorithm, snake) {
        this.name = name;
        this.algorithm = playerAlgorithm;
        this.snake = snake;
    }

    move(board) {
        try {
            return this.algorithm.getMove(board.mapToArray());
        } catch (e){
            return undefined;
        }
    }
}
