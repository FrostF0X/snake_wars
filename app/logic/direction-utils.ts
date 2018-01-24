import { Direction } from "../structure/configuration";
import Point from "../structure/point";

export class DirectionUtils {
    public static createMovedPointInDirection(point: Point, direction: Direction): Point {
        if (direction === Direction.Top) {
            return new Point(point.getX(), point.getY() - 1);
        } else if (direction === Direction.Down) {
            return new Point(point.getX(), point.getY() + 1);
        } else if (direction === Direction.Left) {
            return new Point(point.getX() - 1, point.getY());
        } else if (direction === Direction.Right) {
            return new Point(point.getX() + 1, point.getY());
        }
    }

    public static getOpposite(direction: Direction): Direction {
        if (direction === Direction.Top) {
            return Direction.Down;
        } else if (direction === Direction.Right) {
            return Direction.Left;
        } else if (direction === Direction.Down) {
            return Direction.Top;
        } else if (direction === Direction.Left) {
            return Direction.Left;
        }
    }

    public static rotateCounterClockwise(direction: Direction): Direction {
        if (direction === Direction.Top) {
            return Direction.Left;
        } else if (direction === Direction.Left) {
            return Direction.Down;
        } else if (direction === Direction.Down) {
            return Direction.Right;
        } else if (direction === Direction.Right) {
            return Direction.Top;
        }
    }

    public static rotateClockwise(direction: Direction): Direction {
        if (direction === Direction.Top) {
            return Direction.Right;
        } else if (direction === Direction.Right) {
            return Direction.Down;
        } else if (direction === Direction.Down) {
            return Direction.Left;
        } else if (direction === Direction.Left) {
            return Direction.Top;
        }
    }
}
