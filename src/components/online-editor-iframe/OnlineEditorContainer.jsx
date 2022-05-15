import React, {useEffect, useState} from "react";
import OnlineEditor from "./OnlineEditor";
import HOCs from "../../HOCs";
import {Button, Typography} from "@material-ui/core";
import SendTaskModal from "../SendTaskModal/SendTaskModal";
import {withRouter} from "react-router-dom";


function OnlineEditorContainer(props) {
    const taskId = props?.match?.params?.taskId;
    const [pageTitle, setPageTitle] = useState(`Вы приступаете к выполнению задания №${taskId}`);
    const [open, setOpen] = React.useState(false);

    const toggleSubmitFormVisibility = () => {
        setOpen((state) => !state);
    }

    useEffect(() => {
        function showWelcomeMessage() {
            const id = setTimeout(() => {
                clearTimeout(id);
                setPageTitle("Удачи")
                const innerId = setTimeout(() => {
                    clearTimeout(innerId)
                    setPageTitle("Вы выполняете задание: " + taskId)
                }, 2000)
            }, 2000)
        }

        if (!!taskId) {
            showWelcomeMessage();
        }
    }, [taskId])

    return (
        <>
            <Typography
            className={"text-bold"}
            >{taskId? pageTitle: "Свободный режим разработки"}</Typography>
            <OnlineEditor/>
            {taskId && <Button
                variant="outlined"
                className={"highlight"}
                onClick={() => toggleSubmitFormVisibility()}
            >Уже готово!</Button>}
            <SendTaskModal
                toggleHandler={() => toggleSubmitFormVisibility()}
                open={open}
            />
        </>
    )
}

export default withRouter(HOCs.withHeader(OnlineEditorContainer));