import fs from "fs";

export default class SnakeLoader {
    static importAll() {
        return new Promise(resolve => {
            fs.readdir('./snakes', (error, items) => {
                const imports = {};
                const promises = [];
                items.forEach((item) => {
                    const indexPath = '../../snakes/' + item + '/index.js';

                    console.log(`Loading ${item}`);

                    promises.push(import('../../snakes/' + item + '/index.js').then(result => {
                        imports[item] = result;
                    }).catch((error) => {
                        console.log(`Could not load ${item} from ${indexPath}`);
                        console.log('Reason', error);
                    }));
                });

                Promise.all(promises).then(() => {
                    resolve(imports);
                });
            });
        });
    }
}
