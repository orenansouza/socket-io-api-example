const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors')

const SocketService = require('./services/socketService');
const ChatController = require('./controllers/socketController');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// app.use(cors());

// // Permitir solicitações do domínio onde o cliente React está hospedado (http://localhost:3001)
// io.origins('http://localhost:3001');

// Initialize instances
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

server.listen(3000, () => {
  console.log('Server running on port 3000');
});