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

const getClientState = (chat) => {
    const response = {users: [], messages: [], chatName: chat,};
    response.messages = state.chats[chat].messages;
    response.users = getNames(chat);
    return response
};

const getUserByWs = (ws) => {
    let response;
    Object.keys(state.chats).forEach((chat) => {
            state.chats[chat].users.forEach((e) => {
                if (e.ws === ws) response = Object.assign({chat: chat}, e );
            })
        })
    return response;
}

module.exports.untils = {
    getWebSockets: getWebSockets,
    getNames: getNames,
    getState: getState,
    getClientState: getClientState,
    getUserByWs: getUserByWs,
};

// setInterval(()=>{
//    try{
//     console.log(Object.keys(state.chats.before.users[0]));
//     console.log(Object.keys(state.chats.after.users[0]));
//    }
//    catch (e) {
//        console.log(e);
//    }
// },1000)

