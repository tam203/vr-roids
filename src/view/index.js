require('aframe');
const { createScene } = require('./scene');
const { sendForce } = require('./api');




setInterval(sendForce, 1000);

function start() {
    createScene('game');
}

// Create the a-frame scene once page is ready.
if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    start();
} else {
    document.addEventListener("DOMContentLoaded", start);
}