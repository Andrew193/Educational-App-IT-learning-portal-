import {LABS_URL, TASKS_URL} from "../vars";

export function uploadLab(lab, callBack) {
    let formData = new FormData();
    formData.append("file", lab.files[0]);

    fetch(LABS_URL, {
            method: "POST",
            body: formData
        }
    ).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
        .finally(() => callBack())
}

export function uploadTask(task, labId) {
    let formData = new FormData();
    formData.append("file", task.files[0]);

    return fetch(TASKS_URL + `${labId}`, {
            method: "POST",
            body: formData
        }
    )
        .then((response) => response)
        .catch((error) => error)
}