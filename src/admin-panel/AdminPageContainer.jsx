import React, {useState} from "react";
import HOCs from "../HOCs";
import {uploadLab, uploadTask} from "./adminService";
import CustomizedAccordions from "../components/Accordion/Accordion";
import {Box, Button} from "@mui/material";
import AddExampleOrTask from "./AddExampleOrTask";
import {ADD_TASK_NOT_OK_MESSAGE, ADD_TASK_OK_MESSAGE, notify} from "../vars";

export const UploaderTypes = {
    LAB: "LAB",
    TASK: "TASK",
    EXAMPLE: "EXAMPLE"
}

function AdminPageContainer() {
    const [isLoading, setIsLoading] = useState(false);
    const [uploadType, setUploadType] = useState(UploaderTypes.LAB);
    const [labId, setLabId] = useState(null);
    let inputRef = React.useRef();

    const uploadLabCallBack = () => {
        setIsLoading(false);
        notify("Добавлена новая лабораторная работа!");
    }

    const uploadTaskCallBack = (message) => {
        setIsLoading(false);
        notify(message);
    }

    const isLoadingCover = (callBack) => {
        setIsLoading(true);
        callBack()
    }

    async function uploaderSwitcher(e) {
        switch (uploadType) {
            case(UploaderTypes.LAB): {
                uploadLab(e.target, uploadLabCallBack);
                break;
            }
            case(UploaderTypes.TASK): {
                const response = await uploadTask(e.target, labId);
                if (response.ok) {
                    uploadTaskCallBack(ADD_TASK_OK_MESSAGE);
                } else {
                    uploadTaskCallBack(ADD_TASK_NOT_OK_MESSAGE);
                }
            }
            default:
                return;
        }
    }

    return (
        <Box>
            {isLoading && <div className={"loading"} id={"overlay_loader"}/>}
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
                                        setUploadType(() => UploaderTypes.LAB);
                                        inputRef.current.click();
                                    }}
                                    variant={"outlined"}
                                >Выбрать файл</Button>
                                <input
                                    onChange={(e) => isLoadingCover(() => uploaderSwitcher(e))}
                                    type="file"
                                    ref={inputRef}
                                    style={{display: "none"}}
                                />
                            </form>
                        </>
                    },
                    1: {
                        title: "Добавить пример или задание",
                        content: <AddExampleOrTask
                            setUploadType={setUploadType}
                            setLabId={setLabId}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            onClick={() => {
                                inputRef.current.click();
                            }}
                        />
                    }
                }}
            />
        </Box>
    )
}

export default HOCs.withHeader(AdminPageContainer);