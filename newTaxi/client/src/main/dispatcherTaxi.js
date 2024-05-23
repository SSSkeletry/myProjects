import { makeAutoObservable } from 'mobx';

export default class Dispatcher {
    constructor() {
        this._isAvailable = false; 
        this._dispatcher = {};
        this._tasks = [];
        makeAutoObservable(this);
    }
    setDispatcher(dispatcher) {
        this._dispatcher = dispatcher;
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
    isDispatcher() {
        return this._dispatcher && this._dispatcher.role === 'DISPATCHER';
    }
}
