import { makeAutoObservable } from 'mobx';

export default class GameStore {
    
    constructor() {
        this._shipCoords = [];
        this._enemyShipCoords = [];
        this._gameStarted = false;
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

    enemyIncludes(value) {
        return JSON.parse(JSON.stringify(this._enemyShipCoords)).some(item => item[0 ]=== value[0] && item[1] === value[1]);
    }    

    get shipCoords() {
        return this._shipCoords;
    }

    setShipCoords(shipCoords) {
        this._shipCoords = shipCoords;
    }

    get enemyShipCoords() {
        return this._enemyShipCoords;
    }

    setEnemyShipCoords(enemyCoords) {
        this._enemyShipCoords = enemyCoords;
    }
}