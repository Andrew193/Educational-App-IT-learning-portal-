import {Button} from "@material-ui/core";
import PreviewIcon from "@mui/icons-material/Preview";
import DownloadIcon from "@mui/icons-material/Download";
import Typography from "@mui/material/Typography";
import React from "react";


function LabLectureContainer(props) {
    const {
        lab
    } = props

    return(
        <Typography>
            <div className={"w-100 d-flex justify-content-space-between"}>
                <Button
                    variant={"outlined"}
                    className={"margin-right-10 highlight"}
                >
                    <a
                        href={lab?.webviewlink}
                        className={"d-flex align-items-center"}
                    >
                        <PreviewIcon className={"margin-right-5"}/>Просмотреть лекцию
                    </a>
                </Button>
                <Button
                    variant={"outlined"}
                    className={"highlight"}
                >
                    <a
                        href={lab?.webcontentlink}
                        className={" d-flex align-items-center"}
                    >
                        <DownloadIcon className={"margin-right-5"}/>Скачать лекцию
                    </a>
                </Button>
            </div>
        </Typography>
    )
}

export default LabLectureContainer;