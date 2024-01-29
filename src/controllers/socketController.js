class SocketController {
  constructor(socket, chatService) {
    this.socket = socket;
    this.chatService = chatService;
  }

  handleMessage(message) {
    this.chatService.handleMessage(message);
  }

  handleDisconnect() {
    console.log('User disconnected');
    // Additional logic on disconnect if needed
  }
}

module.exports = SocketController;