import {
    ADD_EXAMPLE_NOT_OK_MESSAGE,
    ADD_EXAMPLE_OK_MESSAGE,
    ADD_TASK_NOT_OK_MESSAGE,
    ADD_TASK_OK_MESSAGE, CSV_SUF,
    DELETE_NOT_OK,
    DELETE_OK,
    EXAMPLES_URL, LAB_CREATED_OK,
    LABS_URL,
    notify,
    TASKS_URL, USERS_URL
} from "../vars";

export const UploaderTypes = {
    LAB: "LAB",
    TASK: "TASK",
    EXAMPLE: "EXAMPLE",
    USER: "USER"
}

export async function uploaderSwitcher(e, uploadType, uploadCallBack, labId) {
    switch (uploadType) {
        case(UploaderTypes.LAB): {
            uploadLab(e.target, uploadCallBack);
            break;
        }
        case(UploaderTypes.USER): {
            createUserFromFile(e.target, uploadCallBack);
            break;
        }
        case(UploaderTypes.TASK): {
            const response = await uploadTask(e.target, labId);
            if (response.ok) {
                uploadCallBack(ADD_TASK_OK_MESSAGE);
            } else {
                uploadCallBack(ADD_TASK_NOT_OK_MESSAGE);
            }
            break;
        }
        case(UploaderTypes.EXAMPLE): {
            const response = await uploadExample(e.target, labId);
            if (response.ok) {
                uploadCallBack(ADD_EXAMPLE_OK_MESSAGE);
            } else {
                uploadCallBack(ADD_EXAMPLE_NOT_OK_MESSAGE);
            }
            break;
        }
        default:
            return;
    }
}

export function createUserFromFile(e, callBack) {
    let formData = new FormData();
    formData.append("file", e.files[0]);

    return fetch(USERS_URL + CSV_SUF, {
            method: "POST",
            body: formData
        }
    )
        .then((response) => response)
        .catch((error) => error)
        .finally(() => callBack())
}

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
        .finally(() => callBack(LAB_CREATED_OK))
}

export function deleteExample(exampleId, labId) {
    return fetch(EXAMPLES_URL + `${exampleId}/${labId}`, {
            method: "DELETE"
        }
    )
        .then(() => {
            notify(DELETE_OK)
        })
        .catch(() => {
            notify(DELETE_NOT_OK)
        })
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

export function uploadExample(task, labId) {
    let formData = new FormData();
    formData.append("file", task.files[0]);

    return fetch(EXAMPLES_URL + `${labId}`, {
            method: "POST",
            body: formData
        }
    )
        .then((response) => response)
        .catch((error) => error)
}