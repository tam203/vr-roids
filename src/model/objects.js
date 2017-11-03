function createFlyingObject() {
    return {
        position: [
            (0.5 - Math.random()),
            (0.5 - Math.random()),
            (0.5 - Math.random())
        ],
        velocity: [
            (0.5 - Math.random()) * 0.5,
            (0.5 - Math.random()) * 0.5,
            (0.5 - Math.random()) * 0.5
        ]
    }
}

function createCraft(id) {
    let craft = createFlyingObject();
    craft.id = id;
    return craft;
}




exports.createFlyingObject = createFlyingObject;
exports.createCraft = createCraft;