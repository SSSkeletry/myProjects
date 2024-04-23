import { makeAutoObservable } from 'mobx';

export default class Dispatcher {
    constructor() {
        this._isAvailable = false; 
        this._tasks = [];
        makeAutoObservable(this);
    }

    setIsAvailable(isAvailable) {
        this._isAvailable = isAvailable;
    }

    setTasks(tasks) {
        this._tasks = tasks;
    }

    get isAvailable() {
        return this._isAvailable;
    }

    get tasks() {
        return this._tasks;
    }
}
