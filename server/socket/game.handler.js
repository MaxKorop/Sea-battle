const players = {}

module.exports = function (io, socket, connectedSockets) {
    players[socket.roomId] = players[socket.roomId] || [];
    socket.on('ships:arrange', ({ ships }) => {
        //Визначаємо індекс гравця в масиві гравців, які розставили кораблі
        let index = players[socket.roomId].findIndex(player => player.id === socket.id);

        //Якщо гравець є в списку даної кімнати, заміняємо на нові
        if (index !== -1) players[socket.roomId][index] = { id: socket.id, ships, sunkenShips: [] };
            
        //Інакше додаємо гравця до масиву
        else players[socket.roomId].push({ id: socket.id, ships, sunkenShips: [] });
        console.log(players);
    });
    socket.on('shoot', ({ coords }) => {
        //Перевірємо чи опонент розставив кораблі
        if (players[socket.roomId].length === 1) {
            //Якщо так, виклкиаємо подію error у клієнта, та передаємо повідомлення, що опонент ще не розставив свої кораблі
            socket.emit('error', 'Enemy did not placed ships on field');
            //Закінчуємо обробку події
            return
        };

        //Знаходимо індекси гравця та опопнента в масиві гравців даної кімнати
        let enemyIndex = players[socket.roomId].findIndex(player => player.id !== socket.id);
        let myIndex = players[socket.roomId].findIndex(player => player.id === socket.id);

        //Знаходимо індекс координат, на яких знаходиться корабель (або його частина)
        let sunkenShipIndex = players[socket.roomId][enemyIndex].ships.findIndex(shipCoords => JSON.stringify(shipCoords) === JSON.stringify(coords));

        //Перевіряємо чи існує цей індекс
        if (sunkenShipIndex !== -1) {
            //Якщо існує додаємо його до потоплених кораблів, та прибираємо його з масиву кораблів {
            players[socket.roomId][enemyIndex].sunkenShips = coords;
            players[socket.roomId][enemyIndex].ships = players[socket.roomId][enemyIndex].ships.filter(shipCell => JSON.stringify(shipCell) !== JSON.stringify(coords));
        }
    });
}