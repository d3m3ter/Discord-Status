const { Client } = require('discord-rpc');
const { clientID } = require('./config.json');

const rpc = new Client({
    "transport": "ipc"
});



rpc.login({clientId: clientID})
.catch(() => {console.error("authentication Error!: ./src/config.json clientID?")})
.then("RPC Ready!");