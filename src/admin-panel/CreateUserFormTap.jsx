import {useFormik} from "formik";
import {createUser} from "../loogin-page/loginService";
import {v4 as uuidv4} from "uuid";
import {notify, SOMETHING_WENT_WRONG, USER_CREATE_OK} from "../vars";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {getAllRoles} from "./adminService";

const validation = Yup.object().shape({
    login: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
    phone: Yup.string()
        .required('Required'),
    username: Yup.string()
        .required('Required'),
    surname: Yup.string()
        .required('Required'),
    usergroup: Yup.string()
        .required('Required'),
    role: Yup.string()
        .required('Required'),
})

function CreateUserFormTap() {
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    const formik = useFormik({
        initialValues: {
            login: "",
            password: "",
            phone: "",
            username: "",
            surname: "",
            usergroup: "",
            role: ""
        },
        validationSchema: validation,
        onSubmit: async (credentials) => {
            setIsLoading(true)
            const response = await createUser(credentials);

            if (response.ok) {
                notify(USER_CREATE_OK);
            } else {
                notify(SOMETHING_WENT_WRONG);
            }
            setIsLoading(false)
        }
    })

    useEffect(() => {
        async function getData() {
            const response = await getAllRoles();

            if (response?.ok) {
                const rolesConfig = await response?.json();
                setRoles(rolesConfig?.roles)
            }

        }

        getData();
    }, [])

    console.log(formik)
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
                        margin="dense"
                        id="password"
                        label="Пароль"
                        type="password"
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
                <Box>
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Номер телефона"
                        type="text"
                        fullWidth
                        variant="standard"
                        className={"margin-top-10"}
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className={"color-red text-left font-size-12"}>{formik.errors.phone}</div>
                    ) : null}
                </Box>
                <Box>
                    <TextField
                        margin="dense"
                        id="username"
                        label="Имя"
                        type="text"
                        fullWidth
                        variant="standard"
                        className={"margin-top-10"}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className={"color-red text-left font-size-12"}>{formik.errors.username}</div>
                    ) : null}
                </Box>
                <Box>
                    <TextField
                        margin="dense"
                        id="surname"
                        label="Фамилия"
                        type="text"
                        fullWidth
                        variant="standard"
                        className={"margin-top-10"}
                        onChange={formik.handleChange}
                        value={formik.values.surname}
                    />
                    {formik.touched.surname && formik.errors.surname ? (
                        <div className={"color-red text-left font-size-12"}>{formik.errors.surname}</div>
                    ) : null}
                </Box>
                <Box>
                    <TextField
                        margin="dense"
                        id="usergroup"
                        label="Группа"
                        type="text"
                        fullWidth
                        variant="standard"
                        className={"margin-top-10"}
                        onChange={formik.handleChange}
                        value={formik.values.usergroup}
                    />
                    {formik.touched.usergroup && formik.errors.usergroup ? (
                        <div className={"color-red text-left font-size-12"}>{formik.errors.usergroup}</div>
                    ) : null}
                </Box>
                <Box>
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="role">Age</InputLabel>
                        <Select
                            labelId="role"
                            id="role"
                            name="role"
                            label="Роль"
                            onChange={formik.handleChange}
                            value={formik.values.role}
                        >
                            {
                                roles?.map(value => (
                                    <MenuItem value={value?.role_name}
                                              key={uuidv4()}>{value?.role_name[0]?.toUpperCase() + value?.role_name?.slice(1)}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    {formik.touched.role && formik.errors.role ? (
                        <div className={"color-red text-left font-size-12"}>{formik.errors.role}</div>
                    ) : null}
                </Box>
                <Button
                    type={"submit"}
                    variant={"outlined"}
                    disableElevation
                    size="small"
                    className={"margin-top-10 p-5-10"}
                >Зарегистрировать</Button>
            </form>
        </Box>
    )
}

export default CreateUserFormTap;