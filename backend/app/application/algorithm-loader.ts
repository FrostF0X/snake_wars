import * as FileSystem from "fs";
import PlayerAlgorithmConfiguration from "../game/player/player-algorithm-configuration";
import PlayerAlgorithmConstructor from "../game/player/player-algorithm-constructor";

export default class AlgorithmLoader {

    constructor(private directory: string, private indexFile: string) {
    }

    public load(): PlayerAlgorithmConfiguration[] {
        const algorithms: PlayerAlgorithmConfiguration[] = [];

        if (FileSystem.existsSync(`./${this.directory}`) === false) {
            return [];
        }

        FileSystem.readdirSync(`./${this.directory}`).forEach((item: string) => {
            console.log(`Loading ${item}`);

            const indexPath: string = `../../${this.directory}/${item}/${this.indexFile}`;

            try {
                algorithms.push(
                    new PlayerAlgorithmConfiguration(item, require(indexPath) as PlayerAlgorithmConstructor)
                );
            } catch (error) {
                console.log(`Could not load ${item} from ${indexPath}`);
                console.log("Reason", error);
            }
        });

        return algorithms;
    }
}
