const {untils} = require('../untils');
const state = untils.getState();

module.exports.chatHandlers = {
    addMessage: (chat, user, message) => {
        console.log(chat);
        const newMessage = {};
        newMessage[user] = message;
        state.chats[chat].messages.push(newMessage);
        return {messages:state.chats[chat].messages,};
    },
}