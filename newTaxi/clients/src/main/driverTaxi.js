import { makeAutoObservable } from 'mobx';

export default class Taxi {
    constructor() {
        this._isAvailable = false;
        this._driver = {};
        makeAutoObservable(this)
    }
    
    setIsAvailable(bool) {
        this._isAvailable = bool;
    }
    
    setDriver(driver) {
        this._driver = driver;
    }

    get isAvailable() {
        return this._isAvailable;
    }

    get driver() {
        return this._driver;
    }
    isDriver() {
        return this._driver && this._driver.role === 'DRIVER';
    }
}