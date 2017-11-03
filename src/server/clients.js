let clients = {};

function getClient(id) {
    return clients[id];
}


function addClient(client) {
    if (!client.id) {
        throw new Error(`Client doesn't have an id: ${client}`);
    }
    clients[client.id] = client;
}


function removeClient(id) {
    delete clients[id];
}

function getAllClients() {
    return Object.keys(clients).map(id => clients[id]);
}

exports.getClient = getClient;
exports.removeClient = removeClient;
exports.getAllClients = getAllClients;
exports.addClient = addClient;