var normalize = require('vectors/normalize')(3);
let commands = {};

function updateCommandForClient(id, command) {
    commands[id] = command;
}

function commandsClear() {
    commands = {};
}

function commandApplyForce(x, y, z) {
    return { 'type': 'force', 'direction': normalize([x, y, z]) };
}

function getAndClearCommands() {
    let oldCommands = commands;;
    commands = {}
    return oldCommands;
}

exports.getAndClearCommands = getAndClearCommands;