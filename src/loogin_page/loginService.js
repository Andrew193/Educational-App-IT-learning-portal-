import {USERS_URL} from "../vars";

export function createUser(userInformation, callBack = () => {
}) {
    let formData = new FormData();
    formData.append("userInformation", JSON.stringify(userInformation));

    return fetch(USERS_URL, {
            method: "POST",
            body: formData
        }
    )
        .then((response) => response)
        .catch((error) => error)
        .finally(() => callBack())
}