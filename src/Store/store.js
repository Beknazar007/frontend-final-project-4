import {makeAutoObservable} from "mobx";
import axios from "axios";
import {BASE_URL} from "../Api";

class Store {

    valute = []

    constructor() {
        makeAutoObservable(this);
    }

    getRates = async () => {
        const data = await axios.get(BASE_URL, {});
        this.valute = Object.values(data.data.Valute);
    }
}
export default new Store();
