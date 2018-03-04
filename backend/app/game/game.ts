import Server = SocketIO.Server;
import { Turn } from "./basic/turn";
import Board from "./board/board";
import { MoveResult } from "./board/move-result";
import Player from "./player/player";
import PlayerCollection from "./player/players-collection";
import Snake from "./snake/snake";

export default class Game {
    // Should be used for displaying results
    // noinspection JSMismatchedCollectionQueryUpdate
    private deadPlayers: Player[] = [];

    constructor(private board: Board,
                private alivePlayers: PlayerCollection,
                private timeout: number,
                private io: Server) {
    }

    public startGame(): void {
        this.nextMove();
    }

    public endGame(): void {
        if (this.alivePlayers.getLength() === 1) {
            console.log("We have a winner: " + this.alivePlayers.get(0).getName());
        } else if (this.alivePlayers.getLength() === 0) {
            throw new Error("No players");
        } else {
            console.log("Draw, candidates: "
                + this.alivePlayers.get(0).getName()
                + " and " + this.alivePlayers.get(0).getName());
        }
    }

    public nextMove(): void {
        if (this.alivePlayers.getLength() < 2) {
            this.endGame();
            return;
        }

        this.movePlayer();
        setTimeout(() => this.nextMove(), 150);
    }

    public movePlayer(): void {
        const player: Player = this.alivePlayers.next();
        const move: string = player.move(this.board);
        const snake: Snake = player.getSnake();

        if (move === Turn.Left) {
            snake.moveLeft();
        } else if (move === Turn.Right) {
            snake.moveRight();
        } else {
            snake.moveStraight();
        }

        if (this.board.getSnakeMoveResult(snake) === MoveResult.Dead) {
            this.kill(player);
        }

        this.io.emit("update", this.board.mapToArray());
    }

    public kill(player: Player): void {
        this.deadPlayers.push(this.alivePlayers.deletePlayerByName(player.getName()));
    }

}
