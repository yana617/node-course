const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');

const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const app = express();
const publicDir = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.static(publicDir));

io.on('connection', (socket) => {
  console.log('New websocket connection');

  socket.on('join', ({ username, room } = {}, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    socket.emit('message', generateMessage('Admin', 'Welcome!'));
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`));
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', generateMessage(user.username, message));
    }
    callback();
  });

  socket.on('sendLocation', (location, callback) => {
    const { latitude, longitude } = location;
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${latitude},${longitude}`));
      callback('Location shared!');
    }
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left`));
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

module.exports = server;
