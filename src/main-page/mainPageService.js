import CustomizedAccordions from "../components/Accordion/Accordion";
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import React from "react";


export function makeLabsList(response) {
    return response.data.labs.map((lab) => {
        return {
            title: lab.data.local_src.fileName.split(".")[0],
            content: <CustomizedAccordions
                accordionConfigObject={{
                    0: {
                        title: "Лекция",
                        content: <Typography>
                            <div>
                                <Button
                                    variant={"outlined"}
                                    className={"margin-right-10"}
                                ><a href={lab.data.local_src.webViewLink}>Просмотреть лекцию</a></Button>
                                <Button
                                    variant={"outlined"}
                                ><a href={lab.data.local_src.webContentLink}>Скачать
                                    лекцию</a></Button>
                            </div>
                        </Typography>
                    }
                }}
            />
        }
    })
}