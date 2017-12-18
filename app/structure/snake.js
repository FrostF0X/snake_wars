import {DOWN, LEFT, RIGHT, TOP} from "./configuration";
import {Direction} from "../logic/direction";

export default class Snake {

    constructor(head, body, direction) {
        this.head = head;
        this.body = body;
        this.direction = direction;
    }

    getBounds() {
        return this.body.splice().concat(this.head);
    }

    eatApple() {
        this.body.push(this.lastTailPoint);
    }

    moveLeft() {
        this.turnLeft();
        this.moveStraight();
    }

    moveRight() {
        this.turnRight();
        this.moveStraight();
    }

    moveStraight() {
        this.lastTailPoint = this.body.pop();
        this.body.unshift(this.head);
        this.head = Direction.createMovedPointInDirection(this.head, this.direction);
    }

    turnLeft() {
        if (this.direction === TOP) {
            this.direction = LEFT;
        } else if (this.direction === LEFT) {
            this.direction = DOWN;
        } else if (this.direction === DOWN) {
            this.direction = RIGHT;
        } else if (this.direction === RIGHT) {
            this.direction = TOP;
        } else {
            throw new Error("Undefined direction " + this.direction);
        }
    }

    turnRight() {
        if (this.direction === TOP) {
            this.direction = RIGHT;
        } else if (this.direction === RIGHT) {
            this.direction = DOWN;
        } else if (this.direction === DOWN) {
            this.direction = LEFT;
        } else if (this.direction === LEFT) {
            this.direction = TOP;
        } else {
            throw new Error("Undefined direction " + this.direction);
        }
    }
}
