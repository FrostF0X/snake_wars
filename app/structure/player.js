export default class Player {
    constructor(index, name, playerAlgorithm, snake) {
        this.index = index;
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