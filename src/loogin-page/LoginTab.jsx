import {Box, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import * as React from "react";
import Button from "@mui/material/Button";
import {authUser} from "./loginService";
import {useDispatch} from "react-redux";
import {setIsAuth} from "../app/authReducer";
import {useHistory} from "react-router-dom";
import {BASE_PATH} from "../App";
import {encryptInformation} from "../authService";
import {AUTH_NOT_FOUND_STORE, AUTH_NOT_OK_MESSAGE, AUTH_OK_MESSAGE, AUTH_TRY, notify, USER_INFO} from "../vars";
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
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            login: "",
            password: ""
        },
        validationSchema: validation,
        onSubmit: async (credentials) => {
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
                notify(AUTH_NOT_OK_MESSAGE);
            }
        }
    })

    useEffect(() => {
        function loadData() {
            notify(AUTH_TRY)

            setTimeout(() => {
                const isUserInfo = getValueFromLocalStorage(USER_INFO)

                if (!isUserInfo) {
                    notify(AUTH_NOT_FOUND_STORE)
                    setIsLoading(() => false)
                }
            }, 1500)
        }

        loadData();

    }, [])

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