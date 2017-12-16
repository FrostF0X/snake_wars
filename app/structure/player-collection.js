export default class PlayerCollection {
    constructor(players) {
        this.players = players;
        this.currentIndex = 0;
    }

    delete(playerName) {
        const index = this.players.findIndex((player) => {
            if (player.name === playerName) {
                return true;
            }
        });

        if (index === -1) {
            throw new Error("No such player here");
        }

        if (index >= this.currentIndex) {
            this.decreaseIndex();
        }

        return this.players.splice(index, 1);
    }

    get(index) {
        return this.players[index];
    }

    next() {
        this.increaseIndex();
        return this.players[this.currentIndex];
    }

    getSnakes() {
        return this.players.map((player) => {
            return player.snake;
        });
    }

    getLength() {
        return this.players.length;
    }

    increaseIndex() {
        this.currentIndex++;
        if (this.currentIndex === this.players.length) {
            this.currentIndex = 0;
        }
    }

    decreaseIndex() {
        this.currentIndex--;
        if (this.currentIndex === -1) {
            this.currentIndex = this.players.length - 1;
        }
    }
}

