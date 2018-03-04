import PlayerAlgorithmConstructor from "./player-algorithm-constructor";

export default class PlayerAlgorithmConfiguration {
    constructor(private name: string, private constructor: PlayerAlgorithmConstructor) {
    }

    public getName(): string {
        return this.name;
    }

    public getConstructor(): PlayerAlgorithmConstructor {
        return this.constructor;
    }
}
