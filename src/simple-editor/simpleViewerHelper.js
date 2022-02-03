import axios from "axios";
import {LABS_URL} from "../vars";

export async function loadLabById(id) {
    const response = await axios.get(LABS_URL + `/${id}`);

    if (`${response.status}`.startsWith("2")) {
        return response.data.lab;
    } else {
        return false;
    }
}