import React, {useState} from "react";
import HOCs from "../HOCs";
import {uploadLab} from "./adminService";
import {toast} from 'react-toastify';
import CustomizedAccordions from "../components/Accordion/Accordion";
import {Box, Button} from "@mui/material";
import AddExampleOrTask from "./AddExampleOrTask";

function AdminPageContainer() {
    const [isLoading, setIsLoading] = useState(false);
    let inputRef = React.useRef();
    const notify = (message) => toast(message);

    const uploadLabCallBack = () => {
        setIsLoading(false);
        notify("Добавлена новая лабораторная работа!");
    }

    const isLoadingCover = (callBack) => {
        setIsLoading(true);
        callBack()
    }

    return (
        <Box>
            <h1
                style={{
                    marginTop: "unset"
                }}
            >Панель администратора</h1>
            <CustomizedAccordions
                accordionConfigObject={{
                    0: {
                        title: "Добавить лекцию",
                        content: <>
                            <form>
                                <Button
                                    disabled={isLoading}
                                    onClick={() => {
                                        inputRef.current.click();
                                    }}
                                    variant={"outlined"}
                                >Выбрать файл</Button>
                                <input
                                    onChange={(e) => isLoadingCover(() => uploadLab(e.target, uploadLabCallBack))}
                                    type="file"
                                    ref={inputRef}
                                    style={{display: "none"}}
                                />
                            </form>
                        </>
                    },
                    1: {
                        title: "Добавить пример или задание",
                        content: <AddExampleOrTask/>
                    }
                }}
            />
        </Box>
    )
}

export default HOCs.withHeader(AdminPageContainer);