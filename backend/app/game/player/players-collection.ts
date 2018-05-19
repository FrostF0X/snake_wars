import Snake from "../snake/snake";
import Player from "./player";

export default class PlayersCollection {
    private currentIndex: number = 0;

    constructor(private players: Player[]) {
        this.decreaseIndex();
    }

    public deletePlayerByName(playerName: string): Player {
        const index: number = this.players.findIndex((player: Player) => {
            if (player.getName() === playerName) {
                return true;
            }
        });

        if (index === -1) {
            throw new Error("No such player here");
        }

        if (index >= this.currentIndex) {
            this.decreaseIndex();
        }

        return this.players.splice(index, 1).shift();
    }

    public get(index: number): Player {
        return this.players[index];
    }

    public next(): Player {
        this.increaseIndex();
        return this.players[this.currentIndex];
    }

    public getSnakes(): Snake[] {
        return this.players.map((player: Player) => {
            return player.getSnake();
        });
    }

    public getLength(): number {
        return this.players.length;
    }

    private increaseIndex(): void {
        this.currentIndex++;
        if (this.currentIndex === this.players.length) {
            this.currentIndex = 0;
        }
    }

    private decreaseIndex(): void {
        this.currentIndex--;
        if (this.currentIndex === -1) {
            this.currentIndex = this.players.length - 1;
        }
    }
}
