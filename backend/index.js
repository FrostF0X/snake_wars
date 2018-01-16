const Factory = require("./dist/structure/every-fucking-thing-factory").default;
const io = require("./dist/server/server").default;

var factory = new Factory();
factory.createGame(io);
