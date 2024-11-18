// ce fichier sera notre server de WebSocket
const Websocket = require('ws');
const ws = new Websocket.Server({ port: 8080 }); // Attention Xampp doit être fermé avant de lancer ce serveur
ws.on('connection', socket => {
    console.log('[WS] Un nouveau client est connecté.');
    socket.on('message', message => {
        console.log(`[WS] message: ${message}`);
        let messageObject = JSON.parse(message.toString());
        
        if(messageObject.text === '/time') {
            messageObject.text = new Date().toString();
        }

        ws.clients.forEach(client => {
            client.send(JSON.stringify(messageObject));
        });
    })
});
console.log('[WS] Server started...');