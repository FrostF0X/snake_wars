import * as Express from "express";
import * as Http from "http";
import * as SocketIO from "socket.io";

const app: Express.Application = Express();
const server: Http.Server = Http.createServer(app);
const socket: SocketIO.Server = SocketIO(server);

app.get("/", (req: Express.Request, res: Express.Response) => {
    res.send("<h1>Hello</h1>");
    res.end();
});

socket.on("connection", (socketInput: SocketIO.Socket) => {
    console.log("a user connected", socketInput.id);

    socketInput.on("disconnect", () => {
        console.log("user disconnected", socketInput.id);
    });
});

server.listen(3001, () => {
    console.log("listening on *:3001");
});

// used in index.js - shuold be refactored to be used inside TypeScript application
// noinspection JSUnusedGlobalSymbols
export default socket;
