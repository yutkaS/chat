const WebSocket = require(`ws`);
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketServer = new WebSocket.Server({server})
app.use(express.json({type: () => true}));
const { handlers, getWebSockets, getState } = require('./back/handleEvent');

socketServer.on('connection', (ws) => {
        // ws.send(JSON.stringify(getState()))
    ws.on('message' , (JSONData) => {
        const data = JSON.parse(JSONData);
        const keys = Object.keys(data);

        keys.forEach((key)=>{
            const dataInfo = data[key];
            const response = handlers[key](dataInfo.chat, dataInfo.userName, dataInfo.message ||  ws);

            getWebSockets(dataInfo.chat).forEach((socket)=>{
                if (!socket) return;
                socket.send(JSON.stringify(response));
            })
        })
    })
    ws.on('close', ()=>{
        const response = handlers.removeUser(ws);
        if(!getWebSockets(response.chat)[0]) return
        getWebSockets(response.chat).forEach((socket)=>{
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


