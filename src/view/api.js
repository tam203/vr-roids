const { socket, messages } = require('./sockets');
const { Observable } = require('rxjs/Observable');
require('rxjs/add/operator/filter');


let ele = document.getElementById('force');

function sendForce() {
    let val = ele.value;
    if (!val) { return; }
    let coords = val.split(',');
    if (coords.length !== 3) { return; }
    socket.send(JSON.stringify({
        'actionType': 'command',
        'type': 'force',
        'direction': [parseFloat(coords[0]), parseFloat(coords[1]), parseFloat(coords[2])]
    }));
}

exports.worldChange = messages.filter(msg => msg.messageType === "worldUpdate");
exports.onJoin = messages.filter(msg => msg.messageType === "onJoin");
exports.newCraft = messages.filter(msg => msg.messageType === "newCraft");

exports.sendForce = sendForce;