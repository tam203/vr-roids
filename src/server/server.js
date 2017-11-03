const { interfaceApi } = require('./messageInterface');
const { startGameLoop } = require('./game');
const { addClient, removeClient } = require('./clients');

function uid() {
    return Math.floor(Math.random() * 10000).toString(16);
}

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-vr-roids';
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');


/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {}); // TODO: Anything in the server?
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});


/**
 * WebSocket server
 */
var wsServer = new webSocketServer({ httpServer: server });


// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log(`${new Date()}: Connection from origin ${request.origin}`);

    // TODO: Think about should I connect, request.origin and Same_origin_policy)
    let connection = request.accept(null, request.origin);
    let client = {
        id: uid(),
        connection: connection
    };
    addClient(client);

    console.log(`${new Date()}: Connected user ${client.id}`);

    interfaceApi.clientJoin(client);

    // user sent some message
    connection.on('message', (message) => interfaceApi.handelClientMessage(client, message));

    // user disconnected
    connection.on('close', function(connection) {
        interfaceApi.clientLeave(client);
        removeClient(client.id);
    });
});

startGameLoop();