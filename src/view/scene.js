require('rxjs/add/operator/filter');
const { onJoin, worldChange, newCraft } = require('./api');
let scene = null;
let crafts = {};

function createScene(containerId) {
    let container = document.getElementById(containerId);
    scene = document.createElement('a-scene');
    scene.setAttribute('width', 600);
    scene.setAttribute('height', 300);
    let box = document.createElement('a-box');
    box.setAttribute('height', '2');
    box.setAttribute('width', '2');
    box.setAttribute('depth', '2');
    box.setAttribute('material', { wireframe: false, side: "back", opacity: 0.5 });
    box.setAttribute('position', '0 0 0');
    scene.appendChild(box);
    let sky = document.createElement('a-sky');
    sky.setAttribute('color', 'black');
    scene.appendChild(sky);
    container.appendChild(scene);
}

function createCraft(craft) {
    console.log(`create craft ${craft.id}`);
    let craftEle = document.createElement('a-sphere');
    craftEle.setAttribute('radius', 0.01);
    craftEle.setAttribute('color', 'red');
    scene.appendChild(craftEle);
    crafts[craft.id] = craftEle;
    updateCraft(craft);
    return craftEle;
}

function createClientCraft(craft) {
    let craftEle = createCraft(craft);
    craftEle.setAttribute('color', 'green');
    let cam = document.createElement('a-camera');
    cam.addEventListener('loaded', function() {
        cam.setAttribute('userHeight', 0);
        cam.setAttribute('position', '0 0 0');
    });
    let cameraWrapper = document.createElement('a-entity');
    cameraWrapper.appendChild(cam);
    craftEle.appendChild(cameraWrapper);
}

function createWorld(world, clientId) {
    for (var craft of world.crafts) {
        if (craft.id !== clientId) {
            createCraft(craft)
        } else {
            createClientCraft(craft)
        };
    }
}

function updateCraft(craft) {
    let craftEle = crafts[craft.id];
    if (craftEle) {
        console.log(`Move craft ${craft.id} to ${craft.position}`)
        craftEle.setAttribute('position', {
            x: craft.position[0],
            y: craft.position[1],
            z: craft.position[2]
        });
    }
}

function updateWorld(world) {
    world.crafts.map(updateCraft);
}

onJoin.subscribe(msg => createWorld(msg.world, msg.you));
worldChange.subscribe(msg => updateWorld(msg.world));
newCraft.filter(msg => !crafts.hasOwnProperty(msg.craft.id)).subscribe(msg => createCraft(msg.craft));

exports.createScene = createScene;