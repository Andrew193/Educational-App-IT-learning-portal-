import CustomizedAccordions from "../components/Accordion/Accordion";
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import ArticleIcon from '@mui/icons-material/Article';
import React from "react";
import PreviewIcon from '@mui/icons-material/Preview';
import DownloadIcon from '@mui/icons-material/Download';


export function makeLabsList(response) {
    return response.data.labs.map((lab) => {
        return {
            forId: lab.data.local_src.fileName.split(".")[0],
            title: <>
                <ArticleIcon className={"margin-right-5"}/>
                {lab.data.local_src.fileName.split(".")[0]}
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
                                        href={lab.data.local_src.webViewLink}
                                        className={"d-flex align-items-center"}
                                    >
                                        <PreviewIcon className={"margin-right-5"}/>Просмотреть лекцию
                                    </a>
                                </Button>
                                <Button
                                    variant={"outlined"}
                                >
                                    <a
                                        href={lab.data.local_src.webContentLink}
                                        className={" d-flex align-items-center"}
                                    >
                                        <DownloadIcon className={"margin-right-5"}/>Скачать лекцию
                                    </a>
                                </Button>
                            </div>
                        </Typography>
                    }
                }}
            />
        }
    })
}