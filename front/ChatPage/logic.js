const socket = new WebSocket(`ws://192.168.0.200:8080`);
const sendButton = document.querySelector('.send_button');
const messageInput = document.querySelector('input');
const users = document.querySelector('.users');
const beforeButton = document.querySelector('.before_button');
const afterButton = document.querySelector('.after_button');
const chatName = document.querySelector('.chat_name');
const messages = document.querySelector('.messages');



socket.onopen = () => {
    console.log('открыл сокет');
    socket.send(JSON.stringify({addUser:{userName:JSON.parse(localStorage.user).userName, chat:JSON.parse(localStorage.user).chat},}));
}

beforeButton.addEventListener('click', ()=>{
    socket.send(JSON.stringify({changeChat:'before',}))
})

afterButton.addEventListener('click', ()=>{
    socket.send(JSON.stringify({changeChat:'after',}))
})

let state = {
    chatName:'',
    messages: [],
    users:[],
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




sendButton.addEventListener('click', ()=>{
    console.log(localStorage.user);
    socket.send(JSON.stringify({addMessage:{ chat:JSON.parse(localStorage.user).chat, userName:JSON.parse(localStorage.user).userName, message:messageInput.value,}}));
});



socket.onmessage = (JSONMessage) => {
    const message = JSON.parse(JSONMessage.data);
    console.log(message);
    setState(message);
}
