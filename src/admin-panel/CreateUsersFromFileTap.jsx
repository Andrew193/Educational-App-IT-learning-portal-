import React from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {Button, Typography} from "@mui/material";
import {uploaderSwitcher, UploaderTypes} from "./adminService";


function CreateUsersFromFileTap(props) {
    const {
        setIsLoading,
    } = props;

    let inputRef = React.useRef();

    return (
        <Typography>
            <div>
                <input
                    onChange={(e) => {
                        uploaderSwitcher(e, UploaderTypes.USER, () => {
                            setIsLoading(() => false)
                        })
                    }}
                    type="file"
                    ref={inputRef}
                    style={{display: "none"}}
                />
                <Button
                    variant={"outlined"}
                    className={"margin-right-10 d-flex align-items-center"}
                    color={"primary"}
                    onClick={() => {
                        setIsLoading(() => true);
                        inputRef.current.click();
                    }}
                >
                    <UploadFileIcon className={"margin-right-5"}/>
                    <span>Выбрать файл ( .csv ) с пользователями</span>
                </Button>
            </div>
        </Typography>
    )
}

export default CreateUsersFromFileTap;