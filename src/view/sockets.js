const { Observable } = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/observable/fromEvent');
//const { fromEvent } = require('rxjs/Observable/fromEvent');

function connectionError(err) {
    console.warn(err);
}

function slowResponse() {
    if (connection.readyState !== 1) {
        console.warn('Unable to communicate with the WebSocket server.');
    }
}

function handelMessage(message) {
    return JSON.parse(message.data);
}

function connect() {

    window.WebSocket = window.WebSocket || window.MozWebSocket;
    if (!window.WebSocket) {
        console.error('Sorry, but your browser doesn\'t support WebSocket.');
        return;
    }


    let connection = new WebSocket('ws://127.0.0.1:1337');
    connection.addEventListener('error', connectionError);

    connection.onerror = connectionError;
    let messages = Observable.fromEvent(connection, 'message').map(handelMessage);

    // If the server wasn't able to respond to the in 3 seconds then warn.
    setInterval(slowResponse, 3000);

    return { connection: connection, messages: messages };
}

let { connection, messages } = connect();

exports.messages = messages;
exports.socket = connection;