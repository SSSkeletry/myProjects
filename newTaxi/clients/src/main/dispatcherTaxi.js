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
        console.log("Dispatcher set:", this._dispatcher);  // Логирование для отладки
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
        console.log("Checking dispatcher role:", this._dispatcher.role);  // Логирование для отладки
        return this._dispatcher && this._dispatcher.role === 'DISPATCHER';
    }
}
