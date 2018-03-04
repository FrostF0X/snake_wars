import { DirectionUtils } from "../basic/direction-utils";
import Point from "../basic/point";
import InitialSnakeConfiguration from "./initial-snake-configuration";
import Snake from "./snake";

export default class SnakeFactory {

    public create(index: number, configuration: InitialSnakeConfiguration): Snake {
        const head: Point = configuration.getHead();
        const body: Point[] = this.createBody(configuration);
        return new Snake(index, head, body, configuration.getDirection());
    }

    private createBody(configuration: InitialSnakeConfiguration): Point[] {
        const body: Point[] = [];

        for (let i: number = 0; i < configuration.getLength(); i++) {
            body.push(DirectionUtils.createMovedPointInDirection(
                configuration.getHead(), DirectionUtils.getOpposite(configuration.getDirection())
            ));
        }

        return body;
    }
}
