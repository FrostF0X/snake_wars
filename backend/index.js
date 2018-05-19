const Factory = require("./dist/application/every-fucking-thing-factory").default;
const io = require("./dist/server/server").default;

let factory = new Factory();
let game = factory.createGame(io);
game.startGame();
