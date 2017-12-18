import fs from "fs";

export default class AlgorithmLoader {

    static load(directory, indexFile) {
        const algorithms = [];

        fs.readdirSync(`./${directory}`).forEach((item) => {
            console.log(`Loading ${item}`);

            const indexPath = `../../${directory}/${item}/${indexFile}`;

            try {
                algorithms.push({
                    name: item,
                    constructor: require(indexPath)
                });
            } catch (error) {
                console.log(`Could not load ${item} from ${indexPath}`);
                console.log('Reason', error);
            }
        });

        return algorithms;
    }
}
