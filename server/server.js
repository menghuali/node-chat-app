const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '..', 'public');

var app = new express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New client connected');

  // Send the message to the current client
  socket.emit('newMessage', {
    from: 'admin',
    text: 'Welcome to the chat app',
    createAt: new Date().getTime()
  });

  // Send message to all clients except the current one
  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'New user joined',
    createAt: new Date().getTime()
  });

  socket.on('createMessage', function(message) {
    console.log('createMessage:', message);

    // send message to all connected clients
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });
});

server.listen(port, () => {
  console.log('Server is up on port ', port);
});
