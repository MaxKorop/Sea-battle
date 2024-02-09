import { makeAutoObservable } from 'mobx';
import { battles, hit, loses, shot, wins } from '../http/gameAPI';

export default class GameStore {
    
    constructor() {
        this._shipCoords = [];
        this._enemySunkenShips = [];
        this._mySunkenShips = [];
        this._myMisses = [];
        this._enemyMisses = [];
        this._gameStarted = false;
        this._gameCode = '';
        this._socket = null;
        this._ready = false;
        this._move = false;
        this._message = '';
        this._gameFinished = false;
        this._firstCoords = [];
        this._placedShips = [];
        makeAutoObservable(this);
    }

    get firstCoords() {
        return this._firstCoords;
    }

    setFirstCoords(value) {
        this._firstCoords = value;
    }

    get placedShips() {
        return this._placedShips;
    }

    setPlacedShips(value) {
        this._placedShips = value;
    }

    get gameStarted() {
        return this._gameStarted;
    }

    setGameStarted(value) {
        this._gameStarted = value
    }

    includes(value) {
        return JSON.parse(JSON.stringify(this._shipCoords)).some(item => item[0 ]=== value[0] && item[1] === value[1]);
    }

    mySunkenIncludes(value) {
        return JSON.parse(JSON.stringify(this._mySunkenShips)).some(item => item[0 ]=== value[0] && item[1] === value[1]);
    }    

    enemySunkenIncludes(value) {
        return JSON.parse(JSON.stringify(this._enemySunkenShips)).some(item => item[0 ]=== value[0] && item[1] === value[1]);
    }
    
    myMissesIncludes(value) {
        return JSON.parse(JSON.stringify(this._myMisses)).some(item => item[0 ]=== value[0] && item[1] === value[1]);
    }    

    enemyMissesIncludes(value) {
        return JSON.parse(JSON.stringify(this._enemyMisses)).some(item => item[0 ]=== value[0] && item[1] === value[1]);
    }

    get shipCoords() {
        return this._shipCoords;
    }

    setShipCoords(shipCoords) {
        this._shipCoords = shipCoords;
    }

    get enemySunkenShips() {
        return this._enemySunkenShips;
    }

    setEnemySunkenShips(enemyCoords) {
        if (JSON.stringify(this._enemySunkenShips) !== JSON.stringify(enemyCoords)) {
            this._enemySunkenShips = enemyCoords;
            hit();
        }
    }

    get mySunkenShips() {
        return this._mySunkenShips;
    }

    setMySunkenShips(coords) {
        this._mySunkenShips = coords;
    }

    get myMisses() {
        return this._myMisses;
    }

    setMyMisses(misses) {
        this._myMisses = misses;
    }

    get enemyMisses() {
        return this._enemyMisses;
    }

    setEnemyMisses(misses) {
        this._enemyMisses = misses;
    }

    get gameCode() {
        return this._gameCode;
    }

    setGameCode(code) {
        this._gameCode = code;
    }

    get ready() {
        return this._ready;
    }

    setReady(status) {
        this._ready = status;
    }

    get move() {
        return this._move;
    }

    setMove(status) {
        this._move = status;
        if (this._move) {
            this.setMessage('Your move', 'green');
        } else if (!this._move && this._gameStarted) {
            this.setMessage('Enemy move', 'red');
        }
    }
    
    setMessage(message, color) {
        // Встановлюємо текст повідомлення
        this._message = message;
        // Встановлюємо колір тексту
        this._messageColor = color;
    }

    get socket() {
        return this._socket;
    }

    setSocket(socket) {
        this._socket = socket;
        socket.on('error', message => alert(message));
        socket.on('ready', status => this.setReady(status));
        socket.on('start:game', () => {
            socket.emit('game:start');
            battles();
        });
        socket.on('update', (info) => {
            this.setGameStarted(info.gameStarted);
            this.setShipCoords(info.player.ships);
            this.setReady(info.player.ready);
            this.setEnemySunkenShips(info.player.enemySunkenShips);
            this.setMySunkenShips(info.player.mySunkenShips);
            this.setMyMisses(info.player.myMisses);
            this.setEnemyMisses(info.player.enemyMisses);
            this.setMove(info.player.move);
        });
        socket.on('winner', message => {
            this.setMessage(message);
            this.setGameFinished();
            wins();
        });
        socket.on('loser', message => {
            this.setMessage(message);
            this.setGameFinished();
            loses();
        });
        socket.on('user:connected', message => console.log(message));
        socket.on('user:disconnected', message => console.log(message));
        socket.on('disconnect', () => window.location.href = '/start');
    }

    get message() {
        return this._message;
    }

    setMessage(message) {
        this._message = message;
    }

    get gameFinished() {
        return this._gameFinished;
    }

    setGameFinished() {
        this._gameFinished = true;
    }

    arrangeShips(ships) {
        if (ships) this.socket.emit('ships:arrange', { ships });
        else this.socket.emit('ships:arrange', { ships: this._shipCoords });
    }

    readyToGame() {
        this.socket.emit('player:ready');
    }

    shot(coords) {
        this.socket.emit('shot', { coords });
        shot();
    }

    disconnect() {
        this._socket.disconnect(true);
    }

    clearStore() {
        this._shipCoords = [];
        this._enemySunkenShips = [];
        this._mySunkenShips = [];
        this._myMisses = [];
        this._enemyMisses = [];
        this._gameStarted = false;
        this._socket = null;
        this._ready = false;
        this._move = false;
        this._message = '';
        this._gameFinished = false;
    }

    buildLine(start, end) {
        const line = [];
        const [startX, startY] = start;
        const [endX, endY] = end;            
        if (startY === endY) {
            // Лінія паралельна горизонтальній вісі (по X)
            const minX = Math.min(startX, endX);
            const maxX = Math.max(startX, endX);
            for (let x = minX; x <= maxX; x++) {
                line.push([x, startY]);
            }
        } else {
            // Лінія паралельна вертикальній вісі (по Y)
            const minY = Math.min(startY, endY);
            const maxY = Math.max(startY, endY);
            for (let y = minY; y <= maxY; y++) {
                line.push([startX, y]);
            }
        }
    
        return line;
    }

    hasNeighboringLines(mainLine, otherLines) {
        for (const point of mainLine) {
            const [x, y] = point;
            
            // Перевірка сусідніх точок
            const neighbors = [
                [x - 1, y],
                [x - 1, y - 1],
                [x - 1, y + 1],
                [x + 1, y],
                [x + 1, y - 1],
                [x + 1, y + 1],
                [x, y - 1],
                [x, y + 1]
            ];
            
            for (const neighbor of neighbors) {
                const [nx, ny] = neighbor;
                
                // Перевірка, чи точка є частиною іншої лінії
                if (otherLines.some(point => point[0] === nx && point[1] === ny)) {
                    return true;
                }
            }
        }
    
        return false;
    }

    placeShip(shipCoords) {
        //Якщо є ккординати початкової точки
        if (this._firstCoords.length) {
            //Чи горизонтальне розташування корабля
            if ((shipCoords[0] > JSON.parse(JSON.stringify(this._firstCoords))[0] && shipCoords[1] === JSON.parse(JSON.stringify(this._firstCoords))[1])) {
                //Визначення довжини корабля
                const length = Math.abs(shipCoords[0] - JSON.parse(JSON.stringify(this._firstCoords))[0]) + 1;
                //Не можливо поставити корабель довший за 4 клітинки
                if (length > 4) {
                    this.setFirstCoords([]);
                    return;
                }
                //Скільки кораблів даної довжини вже розставлено
                switch (length) {
                    case 1:
                        if (JSON.parse(JSON.stringify(this._placedShips)).filter(item => item === length).length === 4) {
                            this.setFirstCoords([]);
                            return;
                        }
                        break
                    case 2:
                        if (JSON.parse(JSON.stringify(this._placedShips)).filter(item => item === length).length === 3) {
                            this.setFirstCoords([]);
                            return;
                        }
                        break
                    case 3:
                        if (JSON.parse(JSON.stringify(this._placedShips)).filter(item => item === length).length === 2) {
                            this.setFirstCoords([]);
                            return;
                        }
                        break
                    case 4:
                        if (JSON.parse(JSON.stringify(this._placedShips)).filter(item => item === length).length === 1) {
                            this.setFirstCoords([]);
                            return;
                        }
                        break
                }
                //Формування лінії корабля
                const line = this.buildLine(JSON.parse(JSON.stringify(this._firstCoords)), shipCoords);
                //Чи є у нього сусідні кораблі (відстань менше 1 клітинки)
                if (this.hasNeighboringLines(line, JSON.parse(JSON.stringify(this._shipCoords)))) {
                    this.setFirstCoords([]);
                    return;
                }
                //Додавання координат корабля до списку всіх координат кораблів
                this.setShipCoords([...this._shipCoords, ...line]);
                //Додавання до списку довжин розставлених кораблів довжину даного корабля
                this.setPlacedShips([...this._placedShips, length]);
                //Очищення початкової координати
                this.setFirstCoords([]);
                return;
            }
            else {
                const length = Math.abs(shipCoords[1] - JSON.parse(JSON.stringify(this._firstCoords))[1])+1;
                if (length > 4) {
                    this.setFirstCoords([]);
                    return;
                }
                switch (length) {
                    case 1:
                        if (JSON.parse(JSON.stringify(this._placedShips)).filter(item => item === length).length === 4) {
                            this.setFirstCoords([]);
                            return;
                        }
                        break
                    case 2:
                        if (JSON.parse(JSON.stringify(this._placedShips)).filter(item => item === length).length === 3) {
                            this.setFirstCoords([]);
                            return;
                        }
                        break
                    case 3:
                        if (JSON.parse(JSON.stringify(this._placedShips)).filter(item => item === length).length === 2) {
                            this.setFirstCoords([]);
                            return;
                        }
                        break
                    case 4:
                        if (JSON.parse(JSON.stringify(this._placedShips)).filter(item => item === length).length === 1) {
                            this.setFirstCoords([]);
                            return;
                        }
                        break
                }
                const line = this.buildLine(JSON.parse(JSON.stringify(this._firstCoords)), shipCoords);
                if (this.hasNeighboringLines(line, JSON.parse(JSON.stringify(this._shipCoords)))) {
                    this.setFirstCoords([]);
                    return;
                }
                this.setShipCoords([...this._shipCoords, ...line]);
                this.setPlacedShips([...this._placedShips, length]);
                this.setFirstCoords([]);
                return;
            }
        }
        this.setFirstCoords(shipCoords);
        return;
    }

    playAgain() {
        this._shipCoords = [];
        this._enemySunkenShips = [];
        this._mySunkenShips = [];
        this._myMisses = [];
        this._enemyMisses = [];
        this._gameStarted = false;
        this._ready = false;
        this._move = false;
        this._message = '';
        this._gameFinished = false;
    }
}

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