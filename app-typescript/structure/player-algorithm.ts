export interface PlayerAlgorithm {
    // Don't why WebStorm assumes it is not used
    // noinspection JSUnusedLocalSymbols
    getMove(board: any[]): string;
}

export default PlayerAlgorithm;
