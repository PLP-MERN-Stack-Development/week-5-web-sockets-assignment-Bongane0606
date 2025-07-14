const { Server } = require('socket.io');
const socketController = require('../controllers/socketController');
const config = require('../config/config');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: config.CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socketController(io, socket);
  });

  return io;
};

module.exports = setupSocket;