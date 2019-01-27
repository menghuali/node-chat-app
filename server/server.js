const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '..', 'public');

var app = new express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New client connected');

  // Send the message to the current client
  socket.emit(
    'newMessage', generateMessage('admin', 'Welcome to the chat app'));

  // Send message to all clients except the current one
  socket.broadcast.emit(
    'newMessage', generateMessage('admin', 'New user joined'));

  // listen to the certian type of events
  socket.on('createMessage', function(message, callback) {
    console.log('createMessage:', message);
    // send message to all connected clients
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', function(coords) {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });
});

server.listen(port, () => {
  console.log('Server is up on port ', port);
});
