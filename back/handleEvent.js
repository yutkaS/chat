const state = {
    chats: {
        before: {messages: [], users: [],},
        after: {messages: [], users: [],}
    }
}



module.exports.getWebSockets = (chat) => {
    const sockets = [];
    state.chats[chat].users.forEach((e) => {
        sockets.push(e.ws);
    })
    return sockets
}

function getUserWsArr(obj) {
    const arr = [];
    obj.forEach((e) => {
        arr.push(e.ws)
    })
    return arr
}

const getNames = (chat) => {
    const names = [];
    state.chats[chat].users.forEach((e) => {
        names.push(e.userName);
    })
    return {users:names};
}

module.exports.getState = (chat) => {
    return Object.assign({messages:state.chats[chat].messages}, getNames(chat),)
};

const  addUser  =  (chat, user, ws) => {
    user = {userName: user, ws: ws};
    state.chats[chat].users.push(user);
return getNames(chat)
}


module.exports.handlers = {
    addUser: (chat, user, ws) => {
        user = {userName: user, ws: ws};
        state.chats[chat].users.push(user);
        return getNames(chat)
    },
    changeChat: (newChat, zero, ws) => {
        const chat = newChat === 'before' ? 'after' : 'before';
        const clients = state.chats[chat].users;
        state.chats[chat].users.forEach((e, i) => {
            if (e.ws === ws) clients.splice(i, 1);
            addUser(newChat, e.userName, ws);
        });
    },
    removeUser: (ws) => {
        let activeChat;
        for (let chat = 'before'; chat !== 'after'; chat = 'after') {
            activeChat = chat;
            const clients = state.chats[chat].users;
            getUserWsArr(clients).forEach((e, i) => {
                if (e === ws) clients.splice(i, 1);
            });
        }

        return {chat:activeChat, response:getNames(activeChat)};
    },
    addMessage: (chat, user, message) => {
        const addebleMessage = {};
        addebleMessage[user] = message;
        state.chats[chat].messages.push(addebleMessage);
        return {messages:state.chats[chat].messages,};
    },
}

