const Factory = require("./dist/structure/every-fucking-thing-factory").default;
const io = require("./dist/server/server").default;

var factory = new Factory();
var game = factory.createGame(io);
