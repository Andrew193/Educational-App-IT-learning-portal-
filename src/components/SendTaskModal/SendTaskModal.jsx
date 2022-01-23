import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Box} from "@material-ui/core";
import {AdminEmail} from "../../index";

const validation = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    group: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
})

export default function SendTaskModal(props) {

    const formik = useFormik({
        initialValues: {
            name: "",
            group: "",
            email: ""
        },
        onSubmit: values => {
            const subject = `Решение лаб работы 1`;
            const body = `Автоматическое сообщение от студента: <b>${values.name}</b>. <br />
Из группы: <b>${values.group}</b>. <br />
Решение находится во вложениях.
`
            window.open(`mailto:${AdminEmail}?subject=${subject}&body=${body}`);
        },
        validationSchema: validation
    });

    const {
        open,
        toggleHandler
    } = props;

    return (
        <div>
            <Dialog open={open} onClose={toggleHandler}>
                <form onSubmit={formik.handleSubmit} action="mailto:sadovinskiy@gmail.com?subject=myform_submission">
                    <DialogTitle>Отправка задания</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Введите ваше имя, группу и почту
                        </DialogContentText>
                        <Box>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className={"color-red"}>{formik.errors.email}</div>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Your name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className={"color-red"}>{formik.errors.name}</div>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="group"
                                label="Your group"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                value={formik.values.group}
                            />
                            {formik.touched.group && formik.errors.group ? (
                                <div className={"color-red"}>{formik.errors.group}</div>
                            ) : null}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={toggleHandler}>Я ещё работаю!</Button>
                        <Button
                            type={"submit"}
                        >Отправить мой шедевр!!!</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}