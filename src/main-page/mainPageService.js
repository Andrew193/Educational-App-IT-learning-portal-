import CustomizedAccordions from "../components/Accordion/Accordion";
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import ArticleIcon from '@mui/icons-material/Article';
import React from "react";
import PreviewIcon from '@mui/icons-material/Preview';
import DownloadIcon from '@mui/icons-material/Download';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';


export function makeLabsList(response) {
    return response.data.labs.map((lab) => {
        return {
            forId: lab.filename.split(".")[0],
            title: <>
                <ArticleIcon className={"margin-right-5"}/>
                {lab.filename.split(".")[0]}
            </>,
            content: <CustomizedAccordions
                accordionConfigObject={{
                    0: {
                        forId: "Лекция",
                        title: "Лекция",
                        content: <Typography>
                            <div>
                                <Button
                                    variant={"outlined"}
                                    className={"margin-right-10"}
                                >
                                    <a
                                        href={lab.webviewlink}
                                        className={"d-flex align-items-center"}
                                    >
                                        <PreviewIcon className={"margin-right-5"}/>Просмотреть лекцию
                                    </a>
                                </Button>
                                <Button
                                    variant={"outlined"}
                                >
                                    <a
                                        href={lab.webcontentlink}
                                        className={" d-flex align-items-center"}
                                    >
                                        <DownloadIcon className={"margin-right-5"}/>Скачать лекцию
                                    </a>
                                </Button>
                            </div>
                        </Typography>
                    },
                    1: {
                        forId: "Задание",
                        title: "Задание",
                        content: <Typography>
                            <div>
                                {
                                    !lab?.taskdata
                                        ? <div
                                        className={"d-flex align-items-center justify-content-center"}
                                        >
                                            <InsertEmoticonIcon
                                                className={"margin-right-5"}
                                            />
                                            <Typography>Отсутствует</Typography>
                                        </div>
                                        :
                                        <>
                                            <Button
                                                variant={"outlined"}
                                                className={"margin-right-10"}
                                            >
                                                <a
                                                    href={lab?.taskdata?.webViewLink}
                                                    className={"d-flex align-items-center"}
                                                >
                                                    <PreviewIcon className={"margin-right-5"}/>Просмотреть задание
                                                </a>
                                            </Button>
                                            <Button
                                                variant={"outlined"}
                                            >
                                                <a
                                                    href={lab?.taskdata?.webContentLink}
                                                    className={" d-flex align-items-center"}
                                                >
                                                    <DownloadIcon className={"margin-right-5"}/>Скачать задание
                                                </a>
                                            </Button>
                                        </>
                                }
                            </div>
                        </Typography>
                    }
                }}
            />
        }
    })
}