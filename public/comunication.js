/* For cummunicating with the server */
/* Uses socket.io */

/* sending */

//send a request for a token
function getToken(username, password, institute, callback = () => {}) {

    //constuct credentials
    let credentials = {
        username: username,
        password: password,
        institute: institute,
    }
    
    //send request
    socket.emit('login', credentials, (res) => {

        //save response
        token = res;
        callback(res);
    });
}

//send request for evaluations
function getEvaluations(token_, callback = () => {}) {

    //send request
    socket.emit('evaluations', token_, (res) => {

        //save response
        evaluations = res;
        callback(res);
    });
}

//send request for timetable
function getTimetable(token_, weekOff, callback = () => {}) {

    //send request
    socket.emit('timetable', token_, weekOff, (res) => {

        //save response
        timetable = res;
        callback(res);
    });
}

/* recinveing */

//on error
socket.on('error', (err) => {
    //console
    console.error(err);

    success = false;
    waiting = false;
});