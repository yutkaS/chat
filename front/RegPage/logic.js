const socket = new WebSocket(`ws://25.98.178.91:8080`);
socket.onopen = () => {
    console.log('соединение установлено');
}

const select = document.querySelector('select');
const nameInput = document.querySelector('.name');
const submit = document.querySelector('.submit')

submit.addEventListener('click', ()=>{

    const newLocalStorage = {chat:select.value, userName:nameInput.value,};
    localStorage.user = JSON.stringify(newLocalStorage)
    window.location.replace('http://localhost:8080/chat/')
})
