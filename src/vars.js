import {toast} from "react-toastify";

export const LABS_URL = `${process.env.REACT_APP_API_URL}/labs/`;
export const TASKS_URL = `${process.env.REACT_APP_API_URL}/tasks/`;
export const EXAMPLES_URL = `${process.env.REACT_APP_API_URL}/examples/`;
export const USERS_URL = `${process.env.REACT_APP_API_URL}/users/`;
export const AUTH_USER_URL = `${process.env.REACT_APP_API_URL}/users/auth/`;
export const ID_SUF = "/id/"

export const Pages = {
    BASE: "/",
    IDE: "/ide",
    LOGIN: "/login",
    USERS: "/users",
    USER: "/user",
    ADMIN_PANEL: "/admin_panel",
    EDITOR: "/editor",
}

export const USER_INFO = "userInformation";
export const ASC = "ASC";
export const DESC = "DESC";

export const notify = (message) => toast(message);
export const AUTH_OK_MESSAGE = "Доступ предоставлен";
export const AUTH_NOT_OK_MESSAGE = "В доступе отказано";
export const USER_NOT_FOUND = "Пользователь не найден";
export const USER_FOUND = "Информация о пользователе";
export const ADD_TASK_OK_MESSAGE = "Добавлено новое задание!";
export const ADD_TASK_NOT_OK_MESSAGE = "Добавление нового задания не удалось!";
export const ADD_EXAMPLE_OK_MESSAGE = "Добавлен новый пример!";
export const ADD_EXAMPLE_NOT_OK_MESSAGE = "Добавление нового примера не удалось!";
export const AUTH_TRY = "Попытка автоматического подключения";
export const AUTH_NOT_FOUND_STORE = "Сохранение не найдено! Воспользуйтесь формой для входа";
export const SEARCH_START = "Начинаю поиск";
export const SEARCH_OK = "Успешно найдено";
export const SEARCH_NOT_OK = "Не найдено";
export const AUTH_LOGIN_TRY = "Попытка авторизации";