const { world, addCraft, removeCraft, getCraft } = require('../model/world');
const { updateCommandForClient, commandApplyForce } = require('../model/commands');
const { getAllClients } = require('./clients');

function sendWorld(client) {
    client.connection.sendUTF(JSON.stringify({
        messageType: "worldUpdate",
        world: world
    }));
}

function handelClientMessage(client, update) {
    if (update.type === 'utf8') {
        let data = JSON.parse(update.utf8Data);
        if (data.actionType === 'command' && data.type === 'force') {
            updateCommandForClient(client.id, commandApplyForce(data.x, data.y, data.z));
        }
    }
}


function clientJoin(client) {
    // TODO: remove later.
    // addCraft('d_' + (Math.random() * 1000).toString(16));
    // addCraft('d_' + (Math.random() * 1000).toString(16));
    // addCraft('d_' + (Math.random() * 1000).toString(16));


    addCraft(client.id);
    client.connection.sendUTF(JSON.stringify({
        messageType: "onJoin",
        you: client.id,
        world: world
    }));
    sendNewCraftToAll(client.id);
}

function clientLeave(client) {
    removeCraft(client.id);
}

function sendNewCraftToAll(clientId) {
    let craft = getCraft(clientId);
    getAllClients().map((client) => sendNewCraft(client, craft));
}

function sendNewCraft(client, craft) {
    client.connection.sendUTF(JSON.stringify({
        messageType: "newCraft",
        craft: craft
    }));
}

let api = {
    sendWorld: sendWorld,
    handelClientMessage: handelClientMessage,
    clientJoin: clientJoin,
    clientLeave: clientLeave,
    sendNewCraftToAll: sendNewCraftToAll
};

exports.interfaceApi = api;