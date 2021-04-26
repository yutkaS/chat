const {untils} = require('../untils');
const state = untils.getState();

module.exports.chatHandlers = {
    addMessage: (ws, message) => {
        const user = untils.getUserByWs(ws)
        const newMessage = {};
        newMessage[user.userName] = message;
        state.chats[user.chat].messages.push(newMessage);
        return {messages:state.chats[user.chat].messages,};
    },
}