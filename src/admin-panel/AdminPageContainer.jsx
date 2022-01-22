import React, {useState} from "react";
import HOCs from "../HOCs";
import {uploadLab} from "./adminService";
import {toast} from 'react-toastify';
import CustomizedAccordions from "../components/Accordion/Accordion";
import {Box} from "@mui/material";
import AddExampleOrTask from "./AddExampleOrTask";


function AdminPageContainer() {
    const [isLoading, setIsLoading] = useState(false);

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
                                <input
                                    onChange={(e) => isLoadingCover(() => uploadLab(e.target, uploadLabCallBack))}
                                    type="file"
                                    placeholder={"Выбрать файл"}
                                    disabled={isLoading}
                                />
                            </form>
                        </>
                    },
                    1: {
                        title: "Добавить пример или задание",
                        content:<AddExampleOrTask />
                    }
                }}
            />
        </Box>
    )
}

export default HOCs.withHeader(AdminPageContainer);