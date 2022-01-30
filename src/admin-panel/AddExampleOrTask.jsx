import React, {useEffect, useState} from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import {LABS_URL} from "../vars";
import {UploaderTypes} from "./AdminPageContainer";


function AddExampleOrTask(props) {
    const {
        onClick,
        setUploadType,
        setLabId,
        isLoading,
        setIsLoading
    } = props;
    const [accordionConfig, setAccordionConfigObject] = useState([]);


    console.log(isLoading)
    useEffect(() => {
        async function getData() {
            const response = await axios.get(LABS_URL);

            if (`${response.status}`.startsWith("2")) {
                setAccordionConfigObject(response.data.labs.map((lab) => {
                    return <>
                        <h3>{lab.filename.split(".")[0]}</h3>
                        <Typography>
                            <div>
                                <Button
                                    variant={"outlined"}
                                    className={"margin-right-10"}
                                >Добавить пример</Button>
                                <Button
                                    variant={"outlined"}
                                    onClick={() => {
                                        setLabId(() => lab.id);
                                        setUploadType(() => UploaderTypes.TASK);
                                        setIsLoading(() => true);
                                        onClick(lab.id);
                                    }}
                                >Добавить задание</Button>
                            </div>
                        </Typography>
                    </>
                }))

            }
        }

        getData();

    }, [])


    return (
        <>
            {accordionConfig}
        </>
    )
}

export default AddExampleOrTask;