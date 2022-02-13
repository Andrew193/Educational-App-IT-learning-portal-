import React, {useState} from "react";
import HOCs from "../HOCs";
import {uploaderSwitcher, UploaderTypes} from "./adminService";
import CustomizedAccordions from "../components/Accordion/Accordion";
import {Box, Button} from "@mui/material";
import AddExampleOrTask from "./AddExampleOrTask";
import {
    notify
} from "../vars";
import {v4 as uuidv4} from "uuid";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CreateUsers from "./CreateUsers";

function AdminPageContainer() {
    const [isLoading, setIsLoading] = useState(false);
    const [uploadType, setUploadType] = useState(UploaderTypes.LAB);
    const [labId, setLabId] = useState(null);
    let inputRef = React.useRef();

    const uploadCallBack = (message) => {
        setIsLoading(false);
        notify(message);
    }

    const isLoadingCover = (callBack) => {
        setIsLoading(true);
        callBack()
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
                key={uuidv4()}
                accordionConfigObject={{
                    0: {
                        title: "Лекции",
                        content: <>
                            <form>
                                <Button
                                    disabled={isLoading}
                                    onClick={() => {
                                        setUploadType(() => UploaderTypes.LAB);
                                        inputRef.current.click();
                                    }}
                                    className={" d-flex align-items-center"}
                                    variant={"outlined"}
                                > <UploadFileIcon className={"margin-right-5"}/> Выбрать файл</Button>
                                <input
                                    onChange={(e) => {
                                        isLoadingCover(() => {
                                            uploaderSwitcher(e, uploadType, uploadCallBack, labId)
                                        })
                                    }}
                                    type="file"
                                    ref={inputRef}
                                    style={{display: "none"}}
                                />
                            </form>
                        </>
                    },
                    1: {
                        title: "Примеры и Задания",
                        content: <AddExampleOrTask
                            setUploadType={setUploadType}
                            setLabId={setLabId}
                            onClick={() => {
                                inputRef.current.click();
                            }}
                        />
                    },
                    2: {
                        title: "Пользователи",
                        content: <CreateUsers/>
                    }
                }}
            />
        </Box>
    )
}

export default HOCs.withHeader(AdminPageContainer);