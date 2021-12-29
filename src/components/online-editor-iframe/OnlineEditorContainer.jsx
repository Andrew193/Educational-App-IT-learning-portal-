import React, {useEffect, useState} from "react";
import OnlineEditor from "./OnlineEditor";
import HOCs from "../../HOCs";
import {Button, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import SendTaskModal from "../SendTaskModal/SendTaskModal";


function OnlineEditorContainer() {
    const history = useHistory();
    const [pageTitle, setPageTitle] = useState("Вы приступаете к выполнению задания №1");
    const [open, setOpen] = React.useState(false);

    const toggleSubmitFormVisibility = () => {
        setOpen((state) => !state);
    }

    useEffect(() => {
        const id = setTimeout(() => {
            clearTimeout(id);
            setPageTitle("Удачи")
            const innerId = setTimeout(() => {
                clearTimeout(innerId)
                setPageTitle("Вы выполняете задание #1")
            }, 2000)
        }, 2000)
    }, [])

    return (
        <>
            <Typography>{pageTitle}</Typography>
            <OnlineEditor/>
            <Button
                variant="outlined"
                onClick={() => toggleSubmitFormVisibility()}
            >Уже готово!</Button>
            <SendTaskModal
                toggleHandler={() => toggleSubmitFormVisibility()}
                open={open}
            />
        </>
    )
}

export default HOCs.withHeader(OnlineEditorContainer);