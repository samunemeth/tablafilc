//importing libaries
global.fetch = require('sync-fetch');
global.express = require('express');
global.http = require('http');
global.socketio = require('socket.io');

//initing libaries
global.app = express();
global.server = http.createServer(app);
global.io = socketio(server);

//importing files
global.api = require('./api');

//settings
const PORT = 3919;

//express seving site
app.use(express.static('public'));
server.listen(PORT, () => { console.log(`>Listenin on port ${PORT}`) });

//init api
api.init();

//socket server
io.on('connection', (socket) => {

    //login request
    socket.on('login', (credentials, callback) => {
        //request
        let token = api.token(credentials);

        //error
        if (!token) {
            socket.emit('error', 'login');
            return;
        }

        //reply
        callback(token);
    });

    //evaluations request
    socket.on('evaluations', (token, callback) => {
        //get data
        let evaluations = api.evaluations(token);

        //error
        if (!evaluations) {
            socket.emit('error', 'evaluations');
            return;
        }

        //reply
        callback(evaluations);
    });

    //timestable request
    socket.on('timetable', (token, weekOff, callback) => {
        //get data
        let timetable = api.timetable(token, weekOff);

        //error
        if (!timetable) {
            socket.emit('error', 'timetable');
            return;
        }

        //reply
        callback(timetable);
    });
});