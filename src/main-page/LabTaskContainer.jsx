import Typography from "@mui/material/Typography";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import {Button} from "@material-ui/core";
import PreviewIcon from "@mui/icons-material/Preview";
import DownloadIcon from "@mui/icons-material/Download";
import React from "react";
import {Pages} from "../vars";
import {useHistory} from "react-router-dom";


function LabTaskContainer(props) {
    const {
        lab
    } = props;

    const history = useHistory();

    return (
        <Typography>
            <div className={"w-100 d-flex justify-content-space-between"}>
                {
                    !lab?.taskdata
                        ? <div
                            className={"d-flex align-items-center justify-content-center"}
                        >
                            <InsertEmoticonIcon
                                className={"margin-right-5"}
                            />
                            <Typography
                                className={"text-bold"}
                            >Отсутствует</Typography>
                        </div>
                        :
                        <>
                            <Button
                                variant={"outlined"}
                                className={"margin-right-10 highlight flex-1-0"}
                            >
                                <a
                                    href={lab?.taskdata?.webViewLink}
                                    className={"d-flex align-items-center"}
                                >
                                    <PreviewIcon className={"margin-right-5"}/>
                                    <span>Просмотреть задание</span>
                                </a>
                            </Button>
                            <Button
                                className={"flex-1-0 margin-left-10 margin-right-10 d-flex align-items-center"}
                                onClick={() => {
                                    history.push(Pages.IDE + `/${lab?.taskdata?.taskName?.split(".")[0]}`)
                                }}
                            >
                                <PreviewIcon className={"margin-right-5"}/>
                                <span>Выполнить онлайн</span>
                            </Button>
                            <Button
                                variant={"outlined"}
                                className={"highlight flex-1-0"}
                            >
                                <a
                                    href={lab?.taskdata?.webContentLink}
                                    className={" d-flex align-items-center"}
                                >
                                    <DownloadIcon className={"margin-right-5"}/>
                                    <span>Скачать задание</span>
                                </a>
                            </Button>
                        </>
                }
            </div>
        </Typography>
    )
}

export default LabTaskContainer;