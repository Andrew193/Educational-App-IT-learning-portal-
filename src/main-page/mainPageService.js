import CustomizedAccordions from "../components/Accordion/Accordion";
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import ArticleIcon from '@mui/icons-material/Article';
import React from "react";
import PreviewIcon from '@mui/icons-material/Preview';
import DownloadIcon from '@mui/icons-material/Download';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';


export function makeLabsList(response, history) {
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
                                    className={"margin-right-10 highlight"}
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
                                    className={"highlight"}
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
                    },
                    2: {
                        forId: "Примеры",
                        title: "Примеры",
                        content: <Typography>
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
                    }
                }}
            />
        }
    })
}