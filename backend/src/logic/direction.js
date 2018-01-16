import Point from "../structure/point";
import {DOWN, LEFT, RIGHT, TOP} from "../structure/configuration";

export class Direction{
    static createMovedPointInDirection(point, direction) {
        if (direction === TOP) {
            return new Point(point.x, point.y - 1);
        } else if (direction === DOWN) {
            return new Point(point.x, point.y + 1);
        } else if (direction === LEFT) {
            return new Point(point.x - 1, point.y);
        } else if (direction === RIGHT) {
            return new Point(point.x + 1, point.y);
        }
        throw new Error("Undefined direction " + direction);
    }

    static getOpposite(direction){
        if (direction === TOP) {
            return DOWN;
        } else if (direction === RIGHT) {
            return LEFT;
        } else if (direction === DOWN) {
            return TOP;
        } else if (direction === LEFT) {
            return RIGHT;
        }

        throw new Error("Undefined direction " + direction);
    }
}