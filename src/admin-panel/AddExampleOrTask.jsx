import React, {useEffect, useState} from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import {LABS_URL} from "../vars";
import {UploaderTypes} from "./AdminPageContainer";
import CustomizedAccordions from "../components/Accordion/Accordion";
import UploadFileIcon from "@mui/icons-material/UploadFile";


function AddExampleOrTask(props) {
    const {
        onClick,
        setUploadType,
        setLabId,
    } = props;
    const [accordionConfig, setAccordionConfigObject] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            setIsLoading(() => true);
            const response = await axios.get(LABS_URL);
            const accordionConfigObject = {};

            if (`${response.status}`.startsWith("2")) {
                response.data.labs.forEach((lab, index) => {
                    accordionConfigObject[index] = {
                        title: lab.filename.split(".")[0],
                        content: <Typography>
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
                        </Typography>
                    }
                })
                setAccordionConfigObject(() => <CustomizedAccordions
                    accordionConfigObject={accordionConfigObject}
                />)
                setIsLoading(() => false);
            }

        }

        getData();

    }, [])


    console.log(isLoading)
    return (
        <>
            {isLoading && <div className={"loading"} id={"overlay_loader"}/>}
            {accordionConfig}
        </>
    )
}

export default AddExampleOrTask;