import { makeAutoObservable } from 'mobx';

export class UserStore {
    constructor() {
        this._login = '';
        this._statistic = {};
        makeAutoObservable(this);
    }

    get login() {
        return this._login;
    }

    setLogin(login) {
        this._login = login;
    }

    get statistic() {
        return this._statistic;
    }

    setStatistic(statistic) {
        this._statistic = statistic;
    }
}