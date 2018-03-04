import AlgorithmLoader from "../../application/algorithm-loader";
import InitialSnakeConfiguration from "../snake/initial-snake-configuration";
import Player from "./player";
import PlayerAlgorithmConfiguration from "./player-algorithm-configuration";
import PlayerAlgorithmConstructor from "./player-algorithm-constructor";
import { PlayerFactory } from "./player-factory";
import PlayersCollection from "./players-collection";

export class PlayersResolver {
    constructor(private loader: AlgorithmLoader, private playerFactory: PlayerFactory,
                private initialSnakeConfigurations: InitialSnakeConfiguration[]) {
    }

    public resolve(): PlayersCollection {
        const algorithmsConfigurations: PlayerAlgorithmConfiguration[] = this.loader.load();
        const maxSnakes: number = this.initialSnakeConfigurations.length;

        if (algorithmsConfigurations.length > maxSnakes) {
            throw new Error(`I refuse to let more than ${maxSnakes} snakes to the game! Don't ask me why ;-(`);
        }

        const players: Player[] = algorithmsConfigurations.map(
            (algorithmConfiguration: PlayerAlgorithmConfiguration, index: number) => {
                const algorithmConstructor: PlayerAlgorithmConstructor = algorithmConfiguration.getConstructor();
                const name: string = algorithmConfiguration.getName();
                const initialSnakeConfiguration: InitialSnakeConfiguration = this.initialSnakeConfigurations[index];

                return this.playerFactory.create(index, name, algorithmConstructor, initialSnakeConfiguration);
            });

        return new PlayersCollection(players);
    }
}
