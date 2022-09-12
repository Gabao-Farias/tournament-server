import express from 'express';
const app = express();
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('SEND_MESSAGE', (data) => {
    socket.broadcast.emit('RECEIVE_MESSAGE', data);
    console.log(data);
  });
});

server.listen(4000, () => {
  console.log('Server listening');
});
