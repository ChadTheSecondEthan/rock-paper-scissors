const display = document.querySelector('#display-container')
const sendMessage = document.querySelector('#send-button')
const joinRoom = document.querySelector('#join-button')
const roomInput = document.querySelector('#room-input')
const messageInput = document.querySelector('#message-input')

const socket = io('http://localhost:3000')
const userSocket = io('http://localhost:3000/user', {
  auth: {
    token: 'Test',
  },
})

userSocket.on('connect_error', (error) => {
  displayMessage(error)
})

let room = ''

socket.on('connect', () => {
  displayMessage('You connected')
})

socket.on('receive-message', (message) => {
  displayMessage(message)
})

sendMessage.addEventListener('click', () => {
  socket.emit('send-message', messageInput.value, room)
})

joinRoom.addEventListener('click', () => {
  room = roomInput.value
  socket.emit('join-room', room, (message) => {
    displayMessage(message)
  })
})

function displayMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = message
  display.appendChild(div)
}
