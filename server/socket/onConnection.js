const gameHandler = require('./game.handler');

let connectedSockets = [];
const players = {}

const onConnection = async (io, socket) => {
    const { id } = socket.handshake.query;
    if (!connectedSockets.filter(socket => socket.handshake.query.id === id).length && id.length !== 36) {
        socket.emit('error', '❗Cannot connect\nRoom does not exist')
        socket.disconnect(true);
        return;
    } else if (connectedSockets.filter(socket => socket.handshake.query.id === id).length < 2) {
        //Створюємо поле roomId для сокета та задаємо його як код за яким приєднався користувач
        socket.roomId = id;

        //Приєднуємо до кімнати
        socket.join(id);

        /*Викликаємо подію userConnected в кімнати (до якої приєднався користувач)
        та передаємо повідомлення що користувач приєднався*/
        io.to(id).emit('user:connected', 'A new user has been connected to this party');

        //Зберігаємо підключений сокет в масив підключених сокетів
        connectedSockets.push(socket);
    } else {
        socket.emit('error', '❗Cannot connect to room\nRoom already has 2 users!');
        socket.disconnect(true);
        return;
    }
    socket.on('disconnect', () => {
        //Викликаємо подію відключення користувача з кімнати, то розсилаємо повідомлення, що користувач від'єднався іншим користувачам кімнати
        io.to(id).emit('user:disconnected', 'Someone has been disconnected from this party');

        if (players[id][0].gameStarted) {
            io.to(id).emit('error', '❗You cannot continue playing alone\nYou will be diconnected');
    
            io.in(id).disconnectSockets();
            
            delete players[id];
        } else {
            players[id] = players[id].filter(item => item.id !== socket.id);
        }

        //Видаляємо сокет з списку підключених сокетів
        connectedSockets = connectedSockets.filter(connSocket => connSocket.id !== socket.id);
    });

    //Ініціалізуємо обробку подій гри
    gameHandler(io, socket, connectedSockets, players);
}

module.exports = onConnection;