export function setValueToLocalStorage(key, keyValue) {
    localStorage.setItem(key, keyValue);
}

export function getValueFromLocalStorage(key) {
    return localStorage.getItem(key);
}

export function removeValueFromLocalStorage(key) {
    localStorage.removeItem(key)
}

export function replaceLocalStorageValue(key, keyValue) {
    const isExist = getValueFromLocalStorage(key)

    if (isExist) {
        setValueToLocalStorage(key, keyValue)
    }
}