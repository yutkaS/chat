const state = {
    chats:{
        before:{messages:[], users:[],},
        after:{messages:[], users:[],}
    }
}

module.exports.handlers = {
    addUser: (chat, user) => {
        state.chats[chat].users.push(user);
        console.log(state);
    },
    addMessage: (chat, user, message) => {
        const addebleMessage = {};
        addebleMessage[user] = message;
        state.chats[chat].messages.push(addebleMessage);
        console.log(state.chats.before);
    }

}