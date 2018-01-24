import PlayerAlgorithm from "./player-algorithm";

export interface PlayerAlgorithmConstructor {
    // Don't why WebStorm assumes it is not used
    // noinspection JSUnusedLocalSymbols
    new (param: any): PlayerAlgorithm;
}

export default PlayerAlgorithmConstructor;
