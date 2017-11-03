const { onJoin } = require('./api');
let id = null;

onJoin.subscribe(msg => id = msg.you);

exports.getClientId = () => id;