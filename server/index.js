const express = require('express');
const app = express();

const HTTP_PORT = process.env.PORT || 8080;
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', (socket) => {
  console.log("User connected!")
  
  socket.on('message', (message) => {
    io.emit('message', `${message.name} said ${message.message}`);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

server.listen(HTTP_PORT, () => {
  console.log(`Server listening at port ${HTTP_PORT}`);
});

