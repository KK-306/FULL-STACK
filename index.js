const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// Allow client at http://localhost:3000 (React default). Adjust if different.
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET","POST"]
  }
});

const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Welcome message to the newly connected client
  socket.emit('message', {
    user: 'System',
    text: 'Welcome to the chat!'
  });

  // Broadcast to others that someone joined
  socket.broadcast.emit('message', {
    user: 'System',
    text: 'A user has joined the chat'
  });

  // Listen for chat messages from clients
