import CryptoJS from "crypto-js";
import {setValueToLocalStorage} from "./localStorageService";
import {BASE_PATH} from "./App";

export const encryptInformation = (credentials, informationName) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(credentials), process.env.REACT_APP_AUTH_SECRET).toString();

    setValueToLocalStorage(informationName, ciphertext);
}

export const decryptInformation = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.REACT_APP_AUTH_SECRET);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export function redirectAfterLogin(history) {
    try {
        return (pathToRedirectAfterLogin) => {
            if (pathToRedirectAfterLogin) {
                history.push(pathToRedirectAfterLogin)
            } else {
                history.push(BASE_PATH)
            }
        }
    } catch (error) {
        console.error(error)
    }
}