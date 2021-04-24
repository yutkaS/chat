const {untils} = require('../untils');
const state = untils.getState();

module.exports.userHandlers = {
    addUser: (chat, user, ws) => {
        user = {userName: user, ws: ws};
        state.chats[chat].users.push(user);
        return untils.getNames(chat);
    },
    removeUser: (ws) => {
        let activeChat;
        for (let chat = 'before'; chat !== 'after'; chat = 'after') {
            activeChat = chat;
            const clients = state.chats[chat].users;
            untils.getWebSockets(chat).forEach((e, i) => {
                if (e === ws) clients.splice(i, 1);
            });
        }
        return {chat:activeChat, response:untils.getNames(activeChat)};
    },
    changeChat: (newChat, zero, ws) => {
        const chat = newChat === 'before' ? 'after' : 'before';
        const clients = state.chats[chat].users;
        state.chats[chat].users.forEach((e, i) => {
            if (e.ws === ws) clients.splice(i, 1);
            addUser(newChat, e.userName, ws);
        });
    },
}