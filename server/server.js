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

  socket.on('createMessage', function(message) {
    message['createAt'] = new Date().getTime();
    console.log('createMessage:', message);
  });

  socket.emit('newMessage', {
    from: 'Menghua',
    text: 'Hi, this is Menghua',
    createAt: new Date().getTime()
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });
});

server.listen(port, () => {
  console.log('Server is up on port ', port);
});
