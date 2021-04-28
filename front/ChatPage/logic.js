const socket = new WebSocket(`ws://192.168.0.200:8080`);
const sendButton = document.querySelector('.send_button');
const messageInput = document.querySelector('input');
const users = document.querySelector('.users');
const beforeButton = document.querySelector('.before_button');
const afterButton = document.querySelector('.after_button');
const chatName = document.querySelector('.chat_name');
const messages = document.querySelector('.messages');
const storage = JSON.parse(localStorage.user)


socket.onopen = () => {
    console.log('открыл сокет');
    socket.send(JSON.stringify({addUser:{userName:storage.userName, chat:storage.chat},}));
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

    state.users.forEach((e) => {
        userHTML += `<div>${e}</div>`;
    })

    state.messages.forEach((e) => {
        const sender = Object.keys(e)[0];
        chatHTML += `<div class="message">
                        <div class="autor">${sender}:</div> 
                        <div class="text">${e[sender]}</div> 
                     </div>`
    })

    for(let i = 0 ; i < state.messages.length ; i++){


    }

    messages.innerHTML = chatHTML;
    users.innerHTML = userHTML;
    chatName.innerHTML = state.chatName;
}

chatName.innerHTML = state.chatName;




sendButton.addEventListener('click', ()=>{
    socket.send(JSON.stringify({addMessage:{message:messageInput.value,}}));
});



socket.onmessage = (JSONMessage) => {
    const message = JSON.parse(JSONMessage.data);
    console.log(message);
    setState(message);
}
