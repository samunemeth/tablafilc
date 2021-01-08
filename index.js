//importing libaries
global.fetch = require('sync-fetch');
global.express = require('express');
global.http = require('http');
global.socketio = require('socket.io');
global.fs = require('fs');

//initing libaries
global.app = express();
global.server = http.createServer(app);
global.io = socketio(server);

//importing files
global.api = require('./api');
global.settings = require('./settings.json');

//express seving site
app.use(express.static('public'));
server.listen(settings.port, () => { console.log(`>Listenin on port ${settings.port}`) });

//init api
api.init();

//count users
let usercount = 0;
fs.writeFile(settings.userLogFile, '', ()=>{});

//logging
function log(data, file=null) {
    console.log(data);
    if (file) {
        fs.appendFile(file, `${data}\n`, ()=>{});
    }
}

//socket server
io.on('connection', (socket) => {

    //count users
    usercount++;
    let id = usercount;
    log(`>user #${id} connected`, file=settings.userLogFile);

    //disconnect
    socket.on('disconnect', () => {
        log(`>user #${id} disconnected`, file=settings.userLogFile);
    });

    //institutes request
    socket.on('institutes', (callback) => {
        //request
        let institutes = api.institutes();

        //error
        if (!institutes) {
            socket.emit('error', 'institutes');
            return;
        }

        //reply
        callback(institutes);
    });

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