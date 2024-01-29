const players = {}

module.exports = function (io, socket, connectedSockets) {
    players[socket.roomId] = players[socket.roomId] || [{gameStarted: false}];

    //Подія для розставлення кораблів
    socket.on('ships:arrange', ({ ships }) => {
        //Знаходимо індекси гравця та опопнента в масиві гравців даної кімнати
        let myIndex = players[socket.roomId].findIndex(player => player.id === socket.id);
        let enemyIndex = players[socket.roomId].findIndex(player => player.id !== socket.id && !player.hasOwnProperty("gameStarted"));

        //Перевірка чи гравець готовий до гри або гра розпочата (доки він готовий або гра розпочата, він не може змінювати положення свої кораблів)
        if (myIndex !== -1 && (players[socket.roomId][myIndex].ready || players[socket.roomId][0].gameStarted)) {
            socket.emit('error', '❗You cannot place ships when you are ready');
            return;
        }

        //Якщо гравець є в списку даної кімнати, заміняємо на нові
        if (myIndex !== -1) players[socket.roomId][myIndex] = { id: socket.id, ships, enemySunkenShips: [], mySunkenShips: [], myMisses: [], enemyMisses: [], ready: false, move: false};
            
        //Інакше додаємо гравця до масиву
        else players[socket.roomId].push({ id: socket.id, ships, enemySunkenShips: [], mySunkenShips: [], myMisses: [], enemyMisses: [], ready: false, move: false });

        //Знову визначаємо індекс гравця в масиві гравців даної кімнати
        myIndex = players[socket.roomId].findIndex(player => player.id === socket.id);

        //Оновлення даних на front-end
        socket.emit('update', { player: players[socket.roomId][myIndex], gameStarted: players[socket.roomId][0].gameStarted });
        if (enemyIndex !== -1) connectedSockets.filter(connSocket => connSocket.id === players[socket.roomId][enemyIndex]?.id)[0].emit('update', { player: players[socket.roomId][enemyIndex], gameStarted: players[socket.roomId][0].gameStarted });
    });

    //Подія для зміни стану готовності гравця до гри
    socket.on('player:ready', () => {
        //Знаходимо індекси гравця та опопнента в масиві гравців даної кімнати
        let myIndex = players[socket.roomId].findIndex(player => player.id === socket.id && !player.hasOwnProperty("gameStarted"));
        let enemyIndex = players[socket.roomId].findIndex(player => player.id !== socket.id && !player.hasOwnProperty("gameStarted"));

        //Змінюємо статус гравця, чи він готовий до гри
        if (myIndex !== -1) {
            players[socket.roomId][myIndex].ready = !players[socket.roomId][myIndex].ready;
            socket.emit('ready', players[socket.roomId][myIndex].ready);
        }
        else {
            socket.emit('error', '❗You cannot be ready without placing ships');
            return;
        }
        if (enemyIndex !== -1 && players[socket.roomId][enemyIndex].ready && players[socket.roomId][myIndex].ready) io.to(socket.roomId).emit('start:game', 'Start the game');
    })

    //Подія для початку гри
    socket.on('game:start', () => {
        if (players[socket.roomId].length < 3) {
            socket.emit('error', '❗Cannot start the game, enemy did not placed ships');
            return;
        }

        //Знаходимо індекси гравця та опопнента в масиві гравців даної кімнати
        let myIndex = players[socket.roomId].findIndex(player => player.id === socket.id && !player.hasOwnProperty("gameStarted"));
        let enemyIndex = players[socket.roomId].findIndex(player => player.id !== socket.id && !player.hasOwnProperty("gameStarted"));

        //Перевірка чи гравці готові до гри
        if (players[socket.roomId][enemyIndex].ready && players[socket.roomId][myIndex].ready) {
            //Визначення гравця, якому надається право пострілу та оголошення йому про це
            players[socket.roomId][1].move = true;
            players[socket.roomId][0].gameStarted = true;
        } else {
            socket.emit('error', '❗Cannot start the game, you or enemy is not ready');
            return;
        }

        //Оновлення даних на front-end
        socket.emit('update', { player: players[socket.roomId][myIndex], gameStarted: players[socket.roomId][0].gameStarted });
        connectedSockets.filter(connSocket => connSocket.id === players[socket.roomId][enemyIndex].id)[0].emit('update', { player: players[socket.roomId][enemyIndex], gameStarted: players[socket.roomId][0].gameStarted });
    });

    //Подія для пострілу
    socket.on('shot', ({ coords }) => {
        //Перевіряємо чи гра розпочалась
        if (!players[socket.roomId][0].gameStarted) {
            //Якщо ні, відправляємо повідомлення-помилку, що не можна виконати постріл доки гра не розпочата
            socket.emit('error', '❗You cannot shot when game is not started');
            return;
        }

        //Перевірємо чи опонент розставив кораблі
        if (players[socket.roomId].length === 2) {
            //Якщо так, виклкиаємо подію error у клієнта, та передаємо повідомлення, що опонент ще не розставив свої кораблі
            socket.emit('error', '❗Enemy did not placed ships on field');
            return;
        };
        
        //Знаходимо індекси гравця та опопнента в масиві гравців даної кімнати
        let enemyIndex = players[socket.roomId].findIndex(player => player.id !== socket.id && !player.hasOwnProperty("gameStarted"));
        let myIndex = players[socket.roomId].findIndex(player => player.id === socket.id && !player.hasOwnProperty("gameStarted"));

        //Перевіряємо чи гравець має право пострілу
        if (!players[socket.roomId][myIndex].move) {
            socket.emit('error', '❗Not your move');
            return;
        }

        //Знаходимо індекс координат, на яких знаходиться корабель (або його частина)
        let sunkenShipIndex = players[socket.roomId][enemyIndex].ships.findIndex(shipCoords => JSON.stringify(shipCoords) === JSON.stringify(coords));

        //Перевіряємо чи існує цей індекс
        if (sunkenShipIndex !== -1) {
            //Якщо існує додаємо його до потоплених кораблів, та прибираємо його з масиву кораблів
            players[socket.roomId][enemyIndex].mySunkenShips.push(coords);
            players[socket.roomId][myIndex].enemySunkenShips.push(coords);
            players[socket.roomId][enemyIndex].ships = players[socket.roomId][enemyIndex].ships.filter(shipCell => JSON.stringify(shipCell) !== JSON.stringify(coords));
            
        } else {
            players[socket.roomId][myIndex].myMisses.push(coords);
            players[socket.roomId][enemyIndex].enemyMisses.push(coords);
            
            //Замінюємо можливість здійснити постріл у гравців
            players[socket.roomId][myIndex].move = false;
            players[socket.roomId][enemyIndex].move = true;
        }
        //Оновлення даних на front-end
        socket.emit('update', { player: players[socket.roomId][myIndex], gameStarted: players[socket.roomId][0].gameStarted });
        connectedSockets.filter(connSocket => connSocket.id === players[socket.roomId][enemyIndex].id)[0].emit('update', { player: players[socket.roomId][enemyIndex], gameStarted: players[socket.roomId][0].gameStarted });
        
        //Перевірка чи гравець потопив всі кораблі опонента, якщо так, виконати подію winner у переможця та loser у програвшого гравця
        if (!players[socket.roomId][enemyIndex].ships.length) {
            socket.emit('winner', 'You are the winner! 🎉');
            connectedSockets.filter(connSocket => connSocket.id === players[socket.roomId][enemyIndex].id)[0].emit('loser', 'You are losed the game!');
            players[socket.roomId] = [{ gameStarted: false }];
            return;
        }
    });
    /* Події які слухає front-end та що потрібно робити з інформацією переданою від back-end:
        * error - Виводити користувачеві інформацію про помилку яка передається у форматі тексту та блокувати дію, яку він хотів зробити
        * ready - Отримання інформації про готовність користувача до гри
        * start:game - Якщо викликана, викликати подію на back-end "game:start"
        * update - Отримати інформацію для збереження в сховище та оновлення її
        * winner - Якщо викликана, вивести інформацію, що гравець переміг
        * loser - Якщо викликана, вивести інформацію, що гравець програв
    */
    /* Правильний порядок виконання подій на front-end:
        * ships:arrange -> player:ready -> game:start (якщо виконалась подія start:game) -> shot
    */
    /* Примітка (поля об'єкта для оновлення інформації, та що вони означають):
        * id - ID сокета
        * ships - координати кораблів гравця
        * enemySunkenShips - кораблі, які потопив гравець у свого опонента
        * mySunkenShips - кораблі, які потоплені у гравця опонентом
        * myMisses - координати клітинок, в які гравець здійснив постріл, проте там не було корабля (клітинка miss)
        * enemyMisses - координати клітинок, в які опонент здійснив постріл, проте там не було корабля (клітинка miss)
        * ready - готовність гравця
        * move - чи його черга здійснити постріл (якщо false - заборонити можливість натискати на клітинки для здійснення пострілу)
        * gameStarted - значення чи розпочата гра
    */
}