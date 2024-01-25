require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { createServer } = require('http');
const { Server } = require('socket.io');
const onConnection = require('./socket/onConnection');

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN
}));

app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    cors: process.env.ALLOWED_ORIGIN,
    serveClient: false
});
const PORT = process.env.PORT || 5000;

io.on('connection', socket => {
    onConnection(io, socket);
});

server.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});