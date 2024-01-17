import { makeAutoObservable } from 'mobx';

export default class GameStore {
    _shipCoords = [];
    _enemyShipCoords = [];

    constructor() {
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

    setShipCoords(value) {
        this._shipCoords = value
    }

    get enemyShipCoords() {
        return this._enemyShipCoords;
    }

    setEnemyShipCoords(value) {
        this._enemyShipCoords = value
    }
}