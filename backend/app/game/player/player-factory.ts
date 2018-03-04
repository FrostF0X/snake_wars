import Dimension from "../basic/dimension";
import InitialSnakeConfiguration from "../snake/initial-snake-configuration";
import Snake from "../snake/snake";
import SnakeFactory from "../snake/snake-factory";
import Player from "./player";
import PlayerAlgorithm from "./player-algorithm";
import PlayerAlgorithmConstructor from "./player-algorithm-constructor";

export class PlayerFactory {

    constructor(private snakeFactory: SnakeFactory, private boardSize: Dimension, private timeout: number) {
    }

    public create(index: number,
                  name: string,
                  algorithmConstructor: PlayerAlgorithmConstructor,
                  snakeConfiguration: InitialSnakeConfiguration): Player {

        const algorithm: PlayerAlgorithm = new algorithmConstructor({
            board: this.boardSize,
            start: snakeConfiguration,
            timeout: this.timeout,
            type: "snake",
            you: index,
        });
        const snake: Snake = this.snakeFactory.create(index, snakeConfiguration);

        return new Player(name, algorithm, snake);
    }
}
