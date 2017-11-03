const { getAndClearCommands } = require('../model/commands');
const { interfaceApi } = require('./messageInterface');
const { updateWorld } = require('../model/world');
const { getAllClients } = require('./clients');

let lastUpdate = (new Date()).getTime();
let lastCommandUpdate = 0;
let lastClientUpdate = 0;
let clients = null;
const COMMAND_UPDATE_DELAY = 1000;
const UPDATE_DELAY = 100;
const CLIENT_NOTIFY_DELAY = 1;
let commands = [];

function gameLoop() {
    let now = (new Date()).getTime();
    let delta = (now - lastUpdate) / 1000;

    if (now - lastCommandUpdate > COMMAND_UPDATE_DELAY) {
        commands = getAndClearCommands();
        lastCommandUpdate = now;
    }

    updateWorld(delta, commands);

    if (now - lastClientUpdate > CLIENT_NOTIFY_DELAY) {
        getAllClients().map(interfaceApi.sendWorld);
        lastClientUpdate = now;
    }


    lastUpdate = (new Date()).getTime();
}


exports.startGameLoop = function(clientsObject) {
    clients = clientsObject;
    setInterval(gameLoop, 100);
}