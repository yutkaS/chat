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
    return {users: names};
}

const getUserState = (chat) => {

};

const getUserByWs = (ws) => {
    let user = {};
    let usableChat = '';
    for (let chat = 'before'; chat !== 'after'; chat = 'after') {
        usableChat = chat;
        state.chats[usableChat].users.forEach((e) => {
            if (e.ws === ws) {

                user = e;
            }
        })
    }

    return Object.assign(user, {chat:usableChat});
}

module.exports.untils = {
    getWebSockets: getWebSockets,
    getNames: getNames,
    getState: getState,
    getUserState: getUserState,
    getUserByWs: getUserByWs,
};

