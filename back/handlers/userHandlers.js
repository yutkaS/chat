const {untils} = require('../untils');
const state = untils.getState();


getDefaultState = (ws, chat, user, ) => {
    user = {userName: user, ws: ws};
    state.chats[chat].users.push(user);
    const messages = state.chats[chat].messages;
    const users = untils.getNames(chat);

    return {messages: messages, users: users, chatName:chat,};
}

removeUser = (ws) => {
    let chat
    let clients = state.chats['before'].users;
    untils.getWebSockets('before').forEach((e, i) => {
        if (e === ws) {clients.splice(i, 1); chat = 'after'}
    });

    clients = state.chats['after'].users;
    untils.getWebSockets('after').forEach((e, i) => {
        if (e === ws){ clients.splice(i, 1);  chat = 'after'};
    });

    return {chat: chat, response: untils.getNames(chat)};
}
const changeChat = (ws) => {
    console.log('CHANGE CHAT');
    const user = untils.getUserByWs(ws);
   const chat = user.chat === 'before' ? 'after' : 'before';
    removeUser(ws);
    const response = getDefaultState(ws, chat, user.userName);

    return response;
}

// setInterval(()=>{
//     console.log(state.chats.before.users, 'before');
//     console.log(state.chats.after.users, 'after');
// },100)

module.exports.userHandlers = {changeChat: changeChat, removeUser: removeUser, getDefaultState: getDefaultState,}