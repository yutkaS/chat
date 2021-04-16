const WebSocket = require(`ws`);
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketServer = new WebSocket.Server({server})
app.use(express.json({type: () => true}));
const { handlers } = require('./back/handleEvent')

socketServer.on('connection', (ws) => {
    ws.on('message' , (JSONData) => {
        const data = JSON.parse(JSONData);
        const keys = Object.keys(data);
        keys.forEach((key)=>{
            const dataInfo = data[key];
            handlers[key](dataInfo.chat, dataInfo.userName, dataInfo.message);
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


