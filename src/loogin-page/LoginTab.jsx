import {Box, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import * as React from "react";
import Button from "@mui/material/Button";
import {authUser} from "./loginService";
import {useDispatch, useSelector} from "react-redux";
import {authorizeUser, setIsAuth} from "../app/authReducer";
import {useHistory} from "react-router-dom";
import {BASE_PATH} from "../App";
import {decryptInformation, encryptInformation, redirectAfterLogin} from "../authService";
import {
    AUTH_LOGIN_TRY,
    AUTH_NOT_FOUND_STORE,
    AUTH_NOT_OK_MESSAGE,
    AUTH_OK_MESSAGE,
    AUTH_TRY,
    notify,
    USER_INFO
} from "../vars";
import {useEffect, useState} from "react";
import {getValueFromLocalStorage} from "../localStorageService";

const validation = Yup.object().shape({
    login: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
})

function LoginTab() {
    const [isLoading, setIsLoading] = useState(false);
    const {
        isAuth
    } = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            login: "",
            password: ""
        },
        validationSchema: validation,
        onSubmit: async (credentials) => {
            notify(AUTH_LOGIN_TRY)
            setIsLoading(true)
            const response = await authUser(credentials);

            if (response.ok) {
                const userInfo = await response.json();
                encryptInformation(userInfo, USER_INFO)
                dispatch(setIsAuth({
                    isOk: true,
                    message: AUTH_OK_MESSAGE
                }))
                history.push(BASE_PATH)
            } else {
                setIsLoading(() => false)
                notify(AUTH_NOT_OK_MESSAGE);
            }
            setIsLoading(false)
        }
    })

    useEffect(() => {
        async function loadData() {
            setIsLoading(() => true)
            notify(AUTH_TRY)
            const storedUserInformation = getValueFromLocalStorage(USER_INFO)

            if (!storedUserInformation && !isAuth) {
                notify(AUTH_NOT_FOUND_STORE)
                setIsLoading(() => false)
            } else {
                const decryptedUserInformation = decryptInformation(storedUserInformation)?.userInfo;

                const authInformation = {
                    login: decryptedUserInformation?.data?.login,
                    password: decryptedUserInformation?.data?.password
                }

                await dispatch(authorizeUser({
                    values: authInformation,
                    redirectAfterLogin: redirectAfterLogin(history)
                }));
                await setIsLoading(() => false)
            }
        }

        loadData();

    }, [isAuth])

    return (
        <>
            {isLoading && <div className={"loading"} id={"overlay_loader"}/>}
            <Box
                className={"d-flex f-direction"}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Box>
                        <TextField
                            margin="dense"
                            id="login"
                            label="Почта"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={formik.handleChange}
                            value={formik.values.login}
                        />
                        {formik.touched.login && formik.errors.login ? (
                            <div className={"color-red text-left font-size-12"}>{formik.errors.login}</div>
                        ) : null}
                    </Box>
                    <Box>
                        <TextField
                            margin="dense"
                            id="password"
                            label="Пароль"
                            type="text"
                            fullWidth
                            variant="standard"
                            className={"margin-top-10"}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className={"color-red text-left font-size-12"}>{formik.errors.password}</div>
                        ) : null}
                    </Box>
                    <Button
                        type={"submit"}
                        variant={"outlined"}
                        disableElevation
                        size="small"
                        className={"margin-top-10 p-5-10"}
                    >Войти</Button>
                </form>
            </Box>
        </>
    )
}

export default LoginTab;