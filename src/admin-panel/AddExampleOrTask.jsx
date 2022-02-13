import React, {useEffect, useState} from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import {LABS_URL} from "../vars";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TabsContainer from "../tabs/TabsContainer";
import {UploaderTypes} from "./adminService";


function AddExampleOrTask(props) {
    const {
        onClick,
        setUploadType,
        setLabId,
    } = props;
    const [tabsConfig, setTabsConfigObject] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            setIsLoading(() => true);
            const response = await axios.get(LABS_URL);
            const labsTitles = [];
            const labsContent = [];

            if (`${response.status}`.startsWith("2")) {
                response.data.labs.forEach((lab) => {
                    labsTitles.push(lab.filename.split(".")[0]);
                    labsContent.push(<Typography>
                        <div>
                            <Button
                                variant={"outlined"}
                                className={"margin-right-10 d-flex align-items-center"}
                                color={"primary"}
                                onClick={() => {
                                    setLabId(() => lab.id);
                                    setUploadType(() => UploaderTypes.EXAMPLE);
                                    setIsLoading(() => true);
                                    onClick(lab.id);
                                }}
                            >
                                <UploadFileIcon className={"margin-right-5"}/>
                                <span>Добавить пример</span>
                            </Button>
                            <Button
                                variant={"outlined"}
                                onClick={() => {
                                    setLabId(() => lab.id);
                                    setUploadType(() => UploaderTypes.TASK);
                                    setIsLoading(() => true);
                                    onClick(lab.id);
                                }}
                                color={"primary"}
                            >
                                <UploadFileIcon className={"margin-right-5"}/>
                                <span>Добавить задание</span>
                            </Button>
                        </div>
                    </Typography>)
                })
                setTabsConfigObject(() => (
                    <TabsContainer
                        tabsCaptions={labsTitles}
                        tabsContent={labsContent}
                    />
                ))
                setIsLoading(() => false);
            }

        }

        getData();

    }, [])


    return (
        <>
            {isLoading && <div className={"loading"} id={"overlay_loader"}/>}
            {tabsConfig}
        </>
    )
}

export default AddExampleOrTask;