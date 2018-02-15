import * as FileSystem from "fs";
import PlayerAlgorithmConfiguration from "./player-algorithm-configuration";
import PlayerAlgorithmConstructor from "./player-algorithm-constructor";

export default class AlgorithmLoader {

    public static load(directory: string, indexFile: string): PlayerAlgorithmConfiguration[] {
        const algorithms: PlayerAlgorithmConfiguration[] = [];

        if (FileSystem.existsSync(`./${directory}`) === false) {
            return [];
        }

        FileSystem.readdirSync(`./${directory}`).forEach((item: string) => {
            console.log(`Loading ${item}`);

            const indexPath: string = `../../${directory}/${item}/${indexFile}`;

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
