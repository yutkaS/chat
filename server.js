const WebSocket = require(`ws`);
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketServer = new WebSocket.Server({server})
app.use(express.json({type: () => true}));
const {handlers} = require('./back/handleEvent');
const {untils} = require('./back/untils');

socketServer.on('connection', (ws) => {
    ws.on('message', (JSONData) => {


        const data = JSON.parse(JSONData);
        const keys = Object.keys(data);
        keys.forEach((key) => {
            const dataInfo = data[key];
            if (key === 'changeChat') {
                handlers.changeChat(ws);


                let responseForBefore = JSON.stringify(untils.getUserState('before'));
                untils.getWebSockets('before').forEach((socket) => socket.send(responseForBefore));

                let responseForAfter = JSON.stringify(untils.getUserState('after'));
                untils.getWebSockets('after').forEach((socket) => socket.send(responseForAfter))

                return;
            }

            const response = handlers[key](ws, dataInfo);
            const user = untils.getUserByWs(ws);
            untils.getWebSockets(user.chat).forEach((ws) => {
                if (!ws) return;
                ws.send(JSON.stringify(response));
            })
        })
    })
    ws.on('close', () => {
        const removableUser = untils.getUserByWs(ws);
        const chat = removableUser.chat;
        const users = handlers.removeUser(removableUser, chat);
        untils.getWebSockets(chat).forEach((socket) => {
            socket.send(JSON.stringify(users));
        })
    })
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/front/RegPage/index.html");
})
app.get('/RegPage/logic.js', (req, res) => {
    res.sendFile(__dirname + "/front/RegPage/logic.js");
})
app.get('/RegPage/style.css', (req, res) => {
    res.sendFile(__dirname + "/front/RegPage/style.css")
})

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + "/front/ChatPage/index.html");
})
app.get('/chat/style.css', (req, res) => {
    res.sendFile(__dirname + "/front/ChatPage/style.css");
})
app.get('/chat/logic.js', (req, res) => {
    res.sendFile(__dirname + "/front/ChatPage/logic.js");
})


server.listen(8080, () => {
    console.log('server started');
});


