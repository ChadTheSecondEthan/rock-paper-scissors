const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:3000'],
  },
})
const PORT = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, '/../../build')))
server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT)
})

module.exports = { io, express, app, server }
