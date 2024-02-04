require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { createServer } = require('http');
const { Server } = require('socket.io');
const onConnection = require('./socket/onConnection');
const router = require('./routes/index');
const mongoose = require('mongoose');

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000'
}));

app.use(express.json());
app.use('/api', router);

const server = createServer(app);
const io = new Server(server, {
    cors: process.env.ALLOWED_ORIGIN,
    serveClient: false
});
const PORT = process.env.PORT || 5000;

const runServer = () => {
    mongoose.connect(process.env.CONNECTION_STRING)
        .then(console.log('🌿 MongoDB connected'))
        .catch(err => console.log(`❗ Mongoose error: ${err}`));

    server.listen(PORT, () => {
        console.log(`🚀 Server started on port ${PORT}`);
    });
}

io.on('connection', socket => {
    onConnection(io, socket);
});

runServer();