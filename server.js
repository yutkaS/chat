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
            if (key === 'addUser') {
                const defaultState = handlers.getDefaultState(ws, dataInfo.chat, dataInfo.userName);

                untils.getWebSockets(dataInfo.chat).forEach((ws) => {

                    ws.send(JSON.stringify(defaultState));
                })
                return;
            }
            if (key === 'changeChat') {
                const userState = handlers.changeChat(ws);
                let user = untils.getUserByWs(ws);

                const chat = user.chat

                let response = JSON.stringify({users: untils.getNames('before')});
                console.log(response, 'beforeResponse');
                untils.getWebSockets('before').forEach((socket) => socket.send(response));
                response = JSON.stringify({users: untils.getNames('after')});
                untils.getWebSockets('after').forEach((socket) => socket.send(response))
                response = JSON.stringify(userState);

                ws.send(response);
                return;
            }

            const user = untils.getUserByWs(ws);
            const response = handlers[key](ws, dataInfo.message);
            untils.getWebSockets(user.chat).forEach((ws) => {
                if (!ws) return
                ws.send(JSON.stringify(response))
            })
        })
    })
    ws.on('close', () => {
        const response = handlers.removeUser(ws);
        if (!untils.getWebSockets(response.chat)[0]) return
        untils.getWebSockets(response.chat).forEach((socket) => {
            socket.send(JSON.stringify(response.response));
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


