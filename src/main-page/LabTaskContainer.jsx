import Typography from "@mui/material/Typography";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import {Button} from "@material-ui/core";
import PreviewIcon from "@mui/icons-material/Preview";
import DownloadIcon from "@mui/icons-material/Download";
import React from "react";


function LabTaskContainer(props) {
    const {
        lab
    } = props;

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
                                className={"margin-right-10 highlight"}
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
                                variant={"outlined"}
                                className={"highlight"}
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