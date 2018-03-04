import { Direction } from "../basic/direction";
import Point from "../basic/point";

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
