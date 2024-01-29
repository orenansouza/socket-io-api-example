const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors')

const SocketService = require('./services/socketService');
const ChatController = require('./controllers/socketController');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const chatService = new SocketService(io);

io.on('connection', (socket) => {
  console.log('A user connected');

  const chatController = new ChatController(socket, chatService);

  socket.on('chat message', (msg) => {
    chatController.handleMessage(msg);
  });

  socket.on('disconnect', () => {
    chatController.handleDisconnect();
  });
});

server.listen(3002, () => {
  console.log('Server running on port 3002');
});