const {untils} = require('../untils');
const state = untils.getState();


const addUser = (ws, data) => {
    const chat = data.chat;
    const user = {userName: data.userName, ws: ws};
    state.chats[chat].users.push(user);
    const users = untils.getNames(chat);
    const messages = state.chats[chat].messages;


    return {messages: messages, users: users, chatName: chat,};
}

const removeUser = (user, chat) => {

    let users = state.chats[chat].users;
    const i = users.indexOf(user);
    console.log(user, 'user!!');
    console.log(users, i);

    users.splice(i, 1);


    return {users: untils.getNames(chat)};
}

const changeChat = (ws) => {
    const user = untils.getUserByWs(ws);
    const pastChat = user.chat;
    const newChat = pastChat === 'before' ? 'after' : 'before';

    removeUser(user, pastChat);
    return addUser(ws, {chat: newChat, userName: user.userName});
}


module.exports.userHandlers = {changeChat: changeChat, removeUser: removeUser, addUser: addUser,}