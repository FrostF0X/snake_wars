var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.send('<h1>Hello</h1>');
    res.end();
});

io.on('connection', socket => {
    console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

http.listen(3001, () => {
    console.log('listening on *:3001');
});

export default io;