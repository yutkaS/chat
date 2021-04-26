const state = {
    chats: {
        before: {messages: [], users: [],},
        after: {messages: [], users: [],},
    },
};


const getState = () => state;

const getWebSockets = (chat) => {
    const sockets = [];
    state.chats[chat].users.forEach((e) => {
        sockets.push(e.ws);
    })
    return sockets
}

const getNames = (chat) => {
    const names = [];
    state.chats[chat].users.forEach((e) => {

        names.push(e.userName);
    })

    return names;
}

const getUserState = (chat) => {
    const response = {users: [], messages: [], chatName: chat,};
    response.messages = state.chats[chat].messages;
    // console.log( getNames(chat), chat, 'userStateChat');
    // console.log(state.chats.before.users);
    response.users = getNames(chat);
    return response
};

const getUserByWs = (ws) => {
    let response;
    let chat;
    for(let i = 0; i<2 ; i++){
        if(i === 0) chat = 'before';
        if(i === 1) chat = 'after';
        state.chats[chat].users.forEach((e)=>{
            if(e.ws === ws) response = Object.assign(e,{chat:chat});
        })
    }
    return response;
}

module.exports.untils = {
    getWebSockets: getWebSockets,
    getNames: getNames,
    getState: getState,
    getUserState: getUserState,
    getUserByWs: getUserByWs,
};

