import Typography from "@mui/material/Typography";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import {Button} from "@material-ui/core";
import PreviewIcon from "@mui/icons-material/Preview";
import DownloadIcon from "@mui/icons-material/Download";
import React from "react";
import {useHistory} from "react-router-dom";


function LabExampleContainer(props) {
    const {
        lab
    } = props;

    const history = useHistory();

    return(
        <Typography>
            <div>
                {
                    !lab?.exampledata
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
                            {lab?.exampledata.map((example) => (
                                <Typography
                                    className={"d-flex  align-items-center margin-top-10"}
                                >
                                    <Button
                                        variant={"outlined"}
                                        className={"highlight flex-1-0"}
                                    >
                                        <a
                                            href={example?.webViewLink}
                                            className={"d-flex align-items-center"}
                                        >
                                            <PreviewIcon className={"margin-right-5"}/>
                                            <span>Просмотреть задание {example?.exampleName?.split(".")[0]}</span>
                                        </a>
                                    </Button>
                                    <Button
                                        className={"flex-1-0 margin-left-10 margin-right-10 d-flex align-items-center"}
                                        onClick={() => {
                                            history.push(`/editor/${lab?.id}`)
                                        }}
                                    >
                                        <PreviewIcon className={"margin-right-5"}/>
                                        <span>Онлайн</span>
                                    </Button>
                                    <Button
                                        variant={"outlined"}
                                        className={"highlight flex-1-0"}
                                    >
                                        <a
                                            href={example?.webContentLink}
                                            className={" d-flex align-items-center"}
                                        >
                                            <DownloadIcon className={"margin-right-5"}/>
                                            <span>Скачать задание {example?.exampleName?.split(".")[0]}</span>
                                        </a>
                                    </Button>
                                </Typography>
                            ))}
                        </>
                }
            </div>
        </Typography>
    )
}

export default LabExampleContainer;