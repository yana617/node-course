const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');

const { generateMessage, generateLocationMessage } = require('./utils/messages');

const app = express();
const publicDir = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.static(publicDir));

io.on('connection', (socket) => {
  console.log('New websocket connection');
  socket.emit('message', generateMessage('Welcome!'));

  socket.broadcast.emit('message', generateMessage('New user joined!'));

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if(filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }

    io.emit('message', generateMessage(message));
    callback();
  });

  socket.on('sendLocation', (location, callback) => {
    const { latitude, longitude } = location;
    io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${latitude},${longitude}`));
    callback('Location shared!');
  });

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A user has left'));
  });
});

module.exports = server;
