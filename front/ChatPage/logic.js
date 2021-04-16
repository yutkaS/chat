const socket = new WebSocket(`ws://25.98.178.91:8080`);
socket.onopen = () => {
    console.log('соединение установлено');
}

const button = document.querySelector('button');
const messageInput = document.querySelector('input');
const storage = JSON.parse(localStorage.user);

button.addEventListener('click', ()=>{
    socket.send(JSON.stringify({addMessage:{ chat:storage.chat, userName:storage.userName, message:messageInput.value,}}));
});