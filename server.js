// ce fichier sera notre server de WebSocket
const Websocket = require('ws');
const ws = new Websocket.Server({ port: 8080 }); // Attention Xampp doit être fermé avant de lancer ce serveur

let clients = [];

ws.on('connection', socket => {
    console.log('[WS] Un nouveau client est connecté.');

    // accueil du client et envoi de son id et du message de bienvenue
    const clientId = Date.now() + Math.random().toString(36).substr(2, 9);
    clients.push({ clientId, socket });
    socket.send(JSON.stringify({ clientId: 'bot', pseudo: 'chatbot', yourId: clientId, text: "Bienvenue" }));

    // mécanique de traitement des messages du server
    socket.on('message', message => {
        console.log(`[WS] message: ${message}`);
        let messageObject = JSON.parse(message.toString());

        if(messageObject.clientId && messageObject.newPseudo){
            clients.forEach(client => {
                if (client.clientId === messageObject.clientId) {
                    client.pseudo = messageObject.newPseudo;
                    client.socket.send(JSON.stringify({ clientId:'bot', pseudo: 'chatbot', text: 'Pseudo enregistré' }));
                }
            })
        }

        if (messageObject.text === '/time') {
            messageObject.text = new Date().toString();
        }

        if (messageObject.text === '/hello') {
            messageObject.text = "Bonjour à tous";
        }

        if (messageObject.text) {
            clients.forEach(client => {
                client.socket.send(JSON.stringify(messageObject));
            });
        }
    })
});
console.log('[WS] Server started...');