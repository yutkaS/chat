const socket = new WebSocket(`ws://25.98.178.91:8080`);
const sendButton = document.querySelector('.send_button');
const messageInput = document.querySelector('input');
const storage = JSON.parse(localStorage.user);
const users = document.querySelector('.users');
const beforeButton = document.querySelector('.before_button');
const afterButton = document.querySelector('.after_button');
const chatName = document.querySelector('.chat_name');
const messages = document.querySelector('.messages');

const changeChat = (chat) => {
    const changeRequest = {changeChat:{chat:chat}};
    return JSON.stringify(changeRequest);
}

beforeButton.addEventListener('click', ()=>{
    let newLocalStorage = {chat:'before', userName:JSON.parse(localStorage.user).userName};
    console.log('я охуею если это работает');
    localStorage.user = JSON.stringify(newLocalStorage);
    socket.send(changeChat(newLocalStorage.chat))
})

afterButton.addEventListener('click', ()=>{
    let newLocalStorage = {chat:'after', userName:JSON.parse(localStorage.user).userName};
    console.log('я охуею если это работает');
    localStorage.user = JSON.stringify(newLocalStorage);
    socket.send(changeChat(newLocalStorage.chat))
})

let state = {
    chatName:'',
    messages: [],

}

const setState = (data) => {
    Object.assign(state, data);
    render();

}

const render = () => {
    let chatHTML = '';
    let userHTML = '';
    for (let i = 0 ; i < state.users.length ; i++){
        userHTML += `<div>${state.users[i]}</div>`;
    }

    for(let i = 0 ; i < state.messages.length ; i++){
        const autor = Object.keys(state.messages[i])
        chatHTML += `<div class="message"> <div class="autor">${autor}:</div> <div class="text">${state.messages[i][autor]}</div> </div>`
    }


    messages.innerHTML = chatHTML;
    users.innerHTML = userHTML;
    chatName.innerHTML = state.chatName;
}

chatName.innerHTML = state.chatName;

socket.onopen = () => {
    socket.send(JSON.stringify({addUser:{userName:JSON.parse(localStorage.user).userName, chat:JSON.parse(localStorage.user).chat},}));
}

console.log(localStorage.user);
sendButton.addEventListener('click', ()=>{
    console.log(localStorage.user);
    socket.send(JSON.stringify({addMessage:{ chat:JSON.parse(localStorage.user).chat, userName:JSON.parse(localStorage.user).userName, message:messageInput.value,}}));
});



socket.onmessage = (JSONMessage) => {
    console.log(JSONMessage.data);
    const message = JSON.parse(JSONMessage.data);
    setState(message);
}

