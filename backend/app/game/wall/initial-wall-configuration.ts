import { Direction } from "../../application/configuration";
import Point from "../basic/point";

export default class InitialWallConfiguration {
    constructor(private start: Point, private direction: Direction, private length: number) {
    }

    public getStart(): Point {
        return this.start;
    }

    public getDirection(): Direction {
        return this.direction;
    }

    public getLength(): number {
        return this.length;
    }
}
