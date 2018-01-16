import Point from "./point";
import {ALIVE, APPLE_MARKER, DEAD, HEAD_MARKER, PLAYER_MARKER} from "./configuration";

export default class Board {

    constructor(walls, snakes, size) {
        this.walls = walls;
        this.aliveSnakes = snakes;
        this.size = size;
        this.deadSnakes = [];
        this.generateApple();
    }

    generateApple() {
        const x = Math.floor(Math.random() * this.size.width);
        const y = Math.floor(Math.random() * this.size.height);
        const apple = new Point(x, y);

        if (!this.checkCollisionWithSnakes(apple, this.aliveSnakes)) {
            this.apple = apple;
            return;
        }

        this.generateApple();
    }

    getSnakeMoveResult(snake) {
        if (this.checkCollisionWithAnotherPlayers(snake) || this.checkCollisionWithWalls(snake) || this.checkCollisionWithDeadSnakes(snake)) {
            this.killSnake();
            return DEAD;
        } else if (this.checkCollisionWithApple(snake)) {
            snake.eatApple();
            this.generateApple();
        }
        return ALIVE;
    }

    killSnake(snake) {
        const index = this.aliveSnakes.indexOf(snake);

        if (index === -1) {
            throw new Error("no such snake alive");
        }

        this.deadSnakes.push(this.aliveSnakes.splice(index, 1));
    }

    checkCollisionWithAnotherPlayers(snake) {
        return this.checkCollisionWithSnakes(snake.head, this.getOtherAliveSnakes(snake));
    }

    checkCollisionWithDeadSnakes(snake) {
        return this.checkCollisionWithSnakes(snake.head, this.deadSnakes);
    }

    checkCollisionWithSnakes(point, snakes) {
        return snakes.some((snake) => {
            return this.checkCollisionWithPointArray(point, snake.getBounds());
        });
    }

    checkCollisionWithWalls(snake) {
        return this.walls.some((wall) => {
            return this.checkCollisionWithPointArray(snake.head, wall.getBounds());
        });
    }

    checkCollisionWithApple(snake) {
        return this.checkCollisionWithPoint(snake.head, this.apple);
    }

    checkCollisionWithPointArray(point, pointArray) {
        return pointArray.some((pointFromArray) => {
            return this.checkCollisionWithPoint(pointFromArray, point);
        });
    }

    checkCollisionWithPoint(point1, point2) {
        return (point1.x === point2.x) && (point1.y === point2.y);
    }

    getOtherAliveSnakes(snake) {
        return this.aliveSnakes.filter(someSnake => someSnake !== snake);
    }

    mapToArray(){
        return BoarToArrayMapper.mapToArray(this);
    }
}

class BoarToArrayMapper {
    static mapToArray(board) {
        const array = this.createArray(board);
        this.addApple(board, array);
        this.fillWithAliveSnakes(board, array);
        this.fillWithDeadSnakes(board, array);
        return array;
    }

    static addApple(board, array) {
        array[board.apple.y][board.apple.x] = APPLE_MARKER;
    }

    static fillWithAliveSnakes(board, array) {
        board.aliveSnakes.forEach((snake) => {
            this.fillWithAliveSnake(array, snake);
        });
    }

    static fillWithDeadSnakes(board, array) {
        board.deadSnakes.forEach((snake) => {
            this.fillWithAliveSnake(array, snake);
        })
    }

    static fillWithAliveSnake(array, snake) {
        array[snake.head.y][snake.head.x] = {[PLAYER_MARKER]: snake.index, [HEAD_MARKER]: snake.direction};
        snake.body.forEach((point) => {
            array[point.y][point.x] = {[PLAYER_MARKER]: snake.index};
        });
    }

    static fillWithDeadSnake(array, snake) {
        const bounds = snake.getBounds();
        bounds.forEach((point) => {
            array[point.y][point.x] = {[DEAD_MARKER]: true};
        })
    }

    static createArray(board) {
        const array = (new Array(board.size.height)).fill(undefined);
        for (let i = 0; i < board.size.height; i++) {
            array[i] = (new Array(board.size.width)).fill(undefined);
        }
        return array;
    }
}