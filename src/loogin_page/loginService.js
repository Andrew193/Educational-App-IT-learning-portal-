export function createUser(userInformation, callBack = () => {
}) {
    let formData = new FormData();
    formData.append("userInformation", JSON.stringify(userInformation));

    return fetch("https://qwertyblut.herokuapp.com/api/users/", {
            method: "POST",
            body: formData
        }
    )
        .then((response) => response)
        .catch((error) => error)
        .finally(() => callBack())
}