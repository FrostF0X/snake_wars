import { Direction } from "../basic/direction";
import { DirectionUtils } from "../basic/direction-utils";
import Point from "../basic/point";

export default class Snake {
    private lastTailPoint: Point;

    constructor(private index: number, private head: Point, private body: Point[], private direction: Direction) {
    }

    public getHead(): Point {
        return this.head;
    }

    public getBody(): Point[] {
        return this.body;
    }

    public getIndex(): number {
        return this.index;
    }

    public getDirection(): Direction {
        return this.direction;
    }

    public getBounds(): Point[] {
        return this.body.slice(0).concat(this.head);
    }

    public eatApple(): void {
        this.body.push(this.lastTailPoint);
    }

    public moveLeft(): void {
        this.turnLeft();
        this.moveStraight();
    }

    public moveRight(): void {
        this.turnRight();
        this.moveStraight();
    }

    public moveStraight(): void {
        this.lastTailPoint = this.body.pop();
        this.body.unshift(this.head);
        this.head = DirectionUtils.createMovedPointInDirection(this.head, this.direction);
    }

    public turnLeft(): void {
        this.direction = DirectionUtils.rotateCounterClockwise(this.direction);
    }

    public turnRight(): void {
        this.direction = DirectionUtils.rotateClockwise(this.direction);
    }
}
