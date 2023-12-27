import {BASE_URL} from "../Api";
import axios from "axios";


export const getValutes = async () => {
    try {
        const data = await axios.get(BASE_URL);
        return data;
        console.log(data);
    } catch (error) {
        console.log(error);
        return error;
    }
}