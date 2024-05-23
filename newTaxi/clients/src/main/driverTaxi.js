import { makeAutoObservable } from 'mobx';

export default class Taxi {
    constructor() {
        // Загрузка состояния из localStorage
        const storedIsAvailable = JSON.parse(localStorage.getItem('isAvailable'));
        this._isAvailable = storedIsAvailable !== null ? storedIsAvailable : false;
        console.log('Taxi constructor: isAvailable =', this._isAvailable);
        this._driver = {};
        makeAutoObservable(this);
    }

    setIsAvailable(bool) {
        this._isAvailable = bool;
        localStorage.setItem('isAvailable', JSON.stringify(bool));
        console.log('setIsAvailable: isAvailable =', this._isAvailable);
        console.log('localStorage value:', localStorage.getItem('isAvailable'));
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