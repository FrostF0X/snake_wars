import Cluster from "cluster";

class WorkerAlgorithm {

    constructor(algorithm) {
        const worker = Cluster.fork();
        worker.on('message', (boardJson) => {
            let board = JSON.parse(boardJson);
            worker.posalgorithm.nextMove(board);
        });
    }
}


