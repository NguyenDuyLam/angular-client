import _ from "lodash";

export default class StorageHelper {

    static setStorageValue(key, value) {
        if (this.isLocalStorageAvailable()) {
            // TODO: Encrypt the object with CryptoJS
            localStorage.setItem(key, value);
        } else {
            sessionStorage.setItem(key, value);
        }
    }

    static getStorageValue(key) {
        if (this.isLocalStorageAvailable()) {
            return localStorage.getItem(key);
        } else {
            return sessionStorage.getItem(key);
        }
    }
    static removeStorageValue(key) {
        if (this.isLocalStorageAvailable()) {
            localStorage.removeItem(key);
        } else {
            sessionStorage.removeItem(key);
        }
    }

    static isLocalStorageAvailable() {
        var value = 'value';
        try {
            localStorage.setItem(value, value);
            localStorage.removeItem(value);
            return true;
        } catch (e) {
            return false;
        }
    }
}