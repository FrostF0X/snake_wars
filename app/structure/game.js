import {DEAD, TURN_LEFT, TURN_RIGHT} from "./configuration";

export default class Game {

    constructor(board, playersCollection, timeout, io){
        this.board = board;
        this.alivePlayers = playersCollection;
        this.io = io;
        this.startGame();
    }

    startGame(){
        this.nextMove();
    }

    endGame(){
        if(this.alivePlayers.getLength() === 1){
            throw new Error("We have a winner: " + this.alivePlayers.get(0).getName());
        }else{
            throw new Error("Draw, candidates: "
                + this.alivePlayers.get(0).getName()
                + " and " + this.alivePlayers.get(0).getName());
        }
    }

    nextMove() {
        if (this.alivePlayers.getLength() < 2) {
            this.endGame();
            return;
        }

        this.movePlayer();
        setTimeout(() => this.nextMove(),10);
    }

    movePlayer(){
        const player = this.alivePlayers.next();
        const move = player.move(this.board);
        const snake = player.snake;

        if (move === TURN_LEFT) {
            snake.moveLeft();
        } else if (move === TURN_RIGHT) {
            snake.moveRight();
        } else {
            snake.moveStraight();
        }

        if(this.board.getSnakeMoveResult(snake) === DEAD){
            this.kill(player);
        }

        this.io.emit("update", this.board.mapToArray());
    }

    kill(player){
        this.deadPlayers.push(this.alivePlayers.delete(player.name));
    }

}