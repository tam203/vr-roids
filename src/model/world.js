const { createCraft } = require('./objects');
const limit = require('vectors/limit')(3);
var mult = require('vectors/mult')(3);
var add = require('vectors/add')(3);

const MAX_SPEED = 0.5;
const SIZE = 1;
const WORLD = {
    crafts: [],
    astroids: []
};

let crafts = {};

function addCraft(id) {
    let craft = createCraft(id);
    WORLD.crafts.push(craft);
    crafts[id] = craft;
}

function getCraft(id) {
    return crafts[id];
}

function removeCraft(id) {
    delete crafts[id];
    for (var i = 0; i < WORLD.crafts.length; i++) {
        var craft = WORLD.crafts[i];
        if (craft.id == id) {
            WORLD.crafts.splice(i, 1);
            break;
        }
    }
}


function applyCommand(command, craft, delta) {
    if (command && command.type === 'force') {
        // TODO: might be issue here... with the multi add etc
        craft.velocity = limit(add(craft.velocity, mult(command.direction, delta)), MAX_SPEED);
    }
}

function move(craft, delta) {
    craft.position = [
        craft.position[0] + delta * craft.velocity[0],
        craft.position[1] + delta * craft.velocity[1],
        craft.position[2] + delta * craft.velocity[2]
    ];
    //add(craft.position, mult(delta, craft.velocity));
    if (craft.position[0] > 1) { craft.position[0] -= 2 }
    if (craft.position[0] < -1) { craft.position[0] += 2 }
    if (craft.position[1] > 1) { craft.position[1] -= 2 }
    if (craft.position[1] < -1) { craft.position[1] += 2 }
    if (craft.position[2] > 1) { craft.position[2] -= 2 }
    if (craft.position[2] < -1) { craft.position[2] += 2 }
}

function updateWorld(delta, commands) {

    for (var i = 0; i < WORLD.crafts.length; i++) {
        var craft = WORLD.crafts[i];
        let command = commands[craft.id];
        //applyCommand(command, craft, delta); // Update based on commands.
        move(craft, delta);
    }

    // TODO: move roids
    // TODO: Collision detection

}



exports.updateWorld = updateWorld;
exports.world = WORLD;
exports.addCraft = addCraft;
exports.removeCraft = removeCraft;
exports.getCraft = getCraft;