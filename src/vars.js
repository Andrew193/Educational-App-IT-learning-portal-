import {toast} from "react-toastify";

export const LABS_URL = `${process.env.REACT_APP_API_URL}/labs/`;
export const TASKS_URL = `${process.env.REACT_APP_API_URL}/tasks/`;
export const EXAMPLES_URL = `${process.env.REACT_APP_API_URL}/examples/`;
export const USERS_URL = `${process.env.REACT_APP_API_URL}/users/`;
export const ROLES_URL = `${process.env.REACT_APP_API_URL}/roles/`;
export const CSV_SUF = "csv";
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

export const BASE_TOOLTIP_BACKGROUND_COLOR = "#f5f5f5";
export const BASE_TOOLTIP_TEXT_COLOR = "black";
export const BASE_TOOLTIP_EFFECT = "solid";
export const BASE_TOOLTIP_BORDER_COLOR = "black";

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
export const START_DELETE = "Начинаю удаление";
export const DELETE_OK = "Удаление удалось";
export const DELETE_NOT_OK = "Удаление не удалось";
export const AUTH_LOGIN_TRY = "Попытка авторизации";
export const LAB_CREATED_OK = "Добавлена новая лабораторная работа!";
export const USER_CREATE_START = "Начинаю создание пользователей";
export const USER_CREATE_OK = "Успешно создано";
export const USER_CREATE_NOT_OK = "Не создано. Или создано частично";
export const SOMETHING_WENT_WRONG = "Что-то пошло не так."