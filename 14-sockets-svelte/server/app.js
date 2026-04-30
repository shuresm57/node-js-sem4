import 'dotenv/config';

import express from 'express';

import session from 'express-session';

import router from './routers/nicknamesRouter.js';

import http from 'http';

import { Server } from 'socket.io';
const app = express();

app.use(express.json());

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
});

app.use(sessionMiddleware);

app.use(router);
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Another socket connected :o)', socket.id);

  socket.on('client-sends-color', (data) => {
    // emits to ALL sockets including itself
    io.emit('server-sends-color', data);

    // broadcasts to all sockts EXCEPT itself
    // socket.broadcast.emit('server-sends-color', data);

    // emits to the socket itself but not the others
    // socket.emit('server-sends-color', data);
  });

  socket.on('disconnect', () => {
    console.log('AAAAAHHH EVERYTHING BURNS AAAAAH NOOO BECAUSE THE SOCKET DISCONNECTED', socket.id);
  });
});

const PORT = process.env.PORT ?? 8080;

server.listen(PORT, () => {
  console.log('Server is running at', PORT);
});
