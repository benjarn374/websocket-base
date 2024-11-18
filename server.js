// ce fichier sera notre server de WebSocket
const Websocket = require('ws');
const ws = new Websocket.Server({ port: 8080 }); // Attention Xampp doit être fermé avant de lancer ce serveur
ws.on('connection', socket => {
    console.log('[WS] Un nouveau client est connecté.');
});
console.log('[WS] Server started...');