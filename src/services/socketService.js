class SocketService {
  constructor(io) {
    this.io = io;
  }

  handleMessage(message) {
    console.log('Handling message:', message);
    this.io.emit('chat message', message);
  }
}

module.exports = SocketService;