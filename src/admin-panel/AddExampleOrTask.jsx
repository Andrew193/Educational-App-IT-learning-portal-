import React, {useEffect, useState} from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import {LABS_URL} from "../vars";


function AddExampleOrTask(props) {
    const {} = props;
    const [accordionConfig, setAccordionConfigObject] = useState([]);


    useEffect(() => {
        async function getData() {
            const response = await axios.get(LABS_URL);

            if (`${response.status}`.startsWith("2")) {
                setAccordionConfigObject(response.data.labs.map((lab) => {
                    return <>
                        <h3>{lab.data.local_src.fileName.split(".")[0]}</h3>
                        <Typography>
                            <div>
                                <Button>Добавить пример</Button>
                                <Button>Добавить задание</Button>
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