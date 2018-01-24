import { Direction } from "./configuration";
import Point from "./point";

export default class InitialSnakeConfiguration {
    constructor(private head: Point, private direction: Direction, private length: number) {
    }

    public getHead(): Point {
        return this.head;
    }

    public getDirection(): Direction {
        return this.direction;
    }

    public getLength(): number {
        return this.length;
    }
}
