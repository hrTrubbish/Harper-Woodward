const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = 8000;

const users = {};

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

io.on('connection', (socket) => {
  socket.emit('connection', null);

  socket.on('new-user', (data) => {
    users[data.id] = data.name;
    socket.emit('user-connected', data.name);
  });

  socket.on('send-message', (message) => {
    io.emit('chat-message', { message, name: users[socket.id] });
  });

  socket.on('disconnect', () => {
    io.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

module.exports = http;
