import Dimension from "../basic/dimension";
import Point from "../basic/point";
import Snake from "../snake/snake";
import Wall from "../wall/wall";
import BoarToArrayMapper from "./board-to-array-mapper";
import { MoveResult } from "./move-result";

export default class Board {
    private aliveSnakes: Snake[];
    private deadSnakes: Snake[];
    private apple: Point;

    constructor(private walls: Wall[], snakes: Snake[], private size: Dimension) {
        this.aliveSnakes = snakes;
        this.deadSnakes = [];
        this.generateApple();
    }

    public generateApple(): void {
        const x: number = Math.floor(Math.random() * this.size.getWidth());
        const y: number = Math.floor(Math.random() * this.size.getHeight());
        const apple: Point = new Point(x, y);

        if (!this.checkCollisionWithSnakes(apple, this.aliveSnakes)) {
            this.apple = apple;
            return;
        }

        this.generateApple();
    }

    public getSnakeMoveResult(snake: Snake): MoveResult {
        if (this.checkCollisionWithObstacles(snake)) {
            this.killSnake(snake);
            return MoveResult.Dead;
        } else if (this.checkCollisionWithApple(snake)) {
            snake.eatApple();
            this.generateApple();
        }
        return MoveResult.Alive;
    }

    public getAliveSnakes(): Snake[] {
        return this.aliveSnakes;
    }

    public getDeadSnakes(): Snake[] {
        return this.deadSnakes;
    }

    public getApple(): Point {
        return this.apple;
    }

    public getSize(): Dimension {
        return this.size;
    }

    public mapToArray(): any[][] {
        return BoarToArrayMapper.mapToArray(this);
    }

    private checkCollisionWithObstacles(snake: Snake): boolean {
        return this.checkCollisionWithAnotherPlayers(snake)
            || this.checkCollisionWithWalls(snake)
            || this.checkCollisionWithDeadSnakes(snake);
    }

    private killSnake(snake: Snake): void {
        const index: number = this.aliveSnakes.indexOf(snake);

        if (index === -1) {
            throw new Error("no such snake alive");
        }

        this.deadSnakes.concat(this.aliveSnakes.splice(index, 1));
    }

    private checkCollisionWithAnotherPlayers(snake: Snake): boolean {
        return this.checkCollisionWithSnakes(snake.getHead(), this.getOtherAliveSnakes(snake));
    }

    private checkCollisionWithDeadSnakes(snake: Snake): boolean {
        return this.checkCollisionWithSnakes(snake.getHead(), this.deadSnakes);
    }

    private checkCollisionWithSnakes(point: Point, snakes: Snake[]): boolean {
        return snakes.some((snake: Snake) => {
            return this.checkCollisionWithPointArray(point, snake.getBounds());
        });
    }

    private checkCollisionWithWalls(snake: Snake): boolean {
        return this.walls.some((wall: Wall) => {
            return this.checkCollisionWithPointArray(snake.getHead(), wall.getBounds());
        });
    }

    private checkCollisionWithApple(snake: Snake): boolean {
        return this.checkCollisionWithPoint(snake.getHead(), this.apple);
    }

    private checkCollisionWithPointArray(point: Point, pointArray: Point[]): boolean {
        return pointArray.some((pointFromArray: Point) => {
            return this.checkCollisionWithPoint(pointFromArray, point);
        });
    }

    private checkCollisionWithPoint(point1: Point, point2: Point): boolean {
        return point2.equalTo(point1);
    }

    private getOtherAliveSnakes(snake: Snake): Snake[] {
        return this.aliveSnakes.filter((someSnake: Snake) => someSnake !== snake);
    }
}
