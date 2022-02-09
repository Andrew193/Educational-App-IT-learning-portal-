import {Box, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {createUser} from "./loginService";
import {setIsAuth} from "../app/authReducer";
import {BASE_PATH} from "../App";
import Button from "@mui/material/Button";
import * as React from "react";
import * as Yup from "yup";
import {encryptInformation} from "../authService";
import {AUTH_OK_MESSAGE, USER_INFO} from "../vars";
import {useState} from "react";

const validation = Yup.object().shape({
    login: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
})

function RegistrationTab() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            login: "",
            password: ""
        },
        validationSchema: validation,
        onSubmit: async (credentials) => {
            setIsLoading(true)
            const response = await createUser(credentials);

            if (response.ok) {
                const userInfo = await response.json();
                encryptInformation(userInfo, USER_INFO)
                dispatch(setIsAuth({
                    isOk: true,
                    message: AUTH_OK_MESSAGE
                }))
                history.push(BASE_PATH)
            } else {
                console.log("error")
            }
            setIsLoading(false)
        }
    })

    return (
        <Box
            className={"d-flex f-direction"}
        >
            {isLoading && <div className={"loading"} id={"overlay_loader"}/>}
            <form onSubmit={formik.handleSubmit}>
                <Box>
                    <TextField
                        autoFocus
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
                        autoFocus
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
                >Зарегистрироваться</Button>
            </form>
        </Box>
    )
}

export default RegistrationTab;