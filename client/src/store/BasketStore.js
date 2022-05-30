import {makeAutoObservable} from "mobx";

export default class BasketStore {

    constructor() {
        this._basket={}
        this._basketDevices=[]
        this._devices=[]

        makeAutoObservable(this)
    }

    setBasket(basket) {
        this._basket = basket
    }

    setDevices(devices) {
        this._devices = devices
    }

    setBasketDevices(devices) {
        this._basketDevices = devices
    }

    get devices() {return this._devices}
    get basket() {return this._basket}
    get basketDevices() {return this._basketDevices}
}

