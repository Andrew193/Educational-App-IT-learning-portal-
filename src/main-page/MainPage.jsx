import React, {useEffect, useState} from "react";
import PdfPreviewContainer from "../components/pdf/PdfPreviewContainer";
import HOCs from "../HOCs"
import CustomizedAccordions from "../components/Accordion/Accordion";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {IDE_PATH} from "../App";
import {importAll} from "../utils";
import SimpleViewerContainer from "../components/SimpleViewerContainer";
import axios from "axios";
import Typography from "@mui/material/Typography";

function MainPage() {
    const [accordionConfigObject, setAccordionConfigObject] = useState(null);

    useEffect(() => {
        async function getData() {
            const response = await axios.get("https://qwertyblut.herokuapp.com/api/labs/");

            if (`${response.status}`.startsWith("2")) {
                setAccordionConfigObject(response.data.labs.map((lab) => {
                    return {
                        title: lab.data.local_src.fileName.split(".")[0],
                        content:<CustomizedAccordions
                            accordionConfigObject={{
                                0: {
                                    title: "Лекция",
                                    content: <Typography>
                                        <div>
                                            <Button><a href={lab.data.local_src.webViewLink}>Просмотреть лекцию</a></Button>
                                            <Button><a href={lab.data.local_src.webContentLink}>Скачать лекцию</a></Button>
                                        </div>
                                    </Typography>
                                }
                            }}
                        />
                    }
                }))

            }
        }

        getData();

    }, [])

    return (
        <>
            <h1
            style={{
                marginTop:"unset"
            }}
            >Главная</h1>
            {accordionConfigObject &&
                <>
                    <CustomizedAccordions
                        accordionConfigObject={accordionConfigObject}
                    />
                </>
            }
        </>
    )
}

export default HOCs.withHeader(MainPage);