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
        return JSON.stringify(this._shipCoords).includes(value);
    }

    enemyIncludes(value) {
        return JSON.stringify(this._enemyShipCoords).includes(value);
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