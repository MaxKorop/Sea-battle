import { makeAutoObservable } from 'mobx';

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
        makeAutoObservable(this);
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
        this._enemySunkenShips = enemyCoords;
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
        if (this._move) alert('Your move');
    }

    get socket() {
        return this._socket;
    }

    setSocket(socket) {
        this._socket = socket;
        socket.on('error', message => alert(message));
        socket.on('ready', status => this.setReady(status));
        socket.on('start:game', () => socket.emit('game:start'));
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
        socket.on('winner', message => alert(message));
        socket.on('loser', message => alert(message));
        socket.on('user:connected', message => console.log(message));
        socket.on('user:disconnected', message => console.log(message));
        socket.on('disconnect', () => window.location.href = '/');
    }

    arrangeShips(ships) {
        this.socket.emit('ships:arrange', { ships });
    }

    readyToGame() {
        this.socket.emit('player:ready');
    }

    shot(coords) {
        this.socket.emit('shot', { coords });
    }

    cleanStore() {
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