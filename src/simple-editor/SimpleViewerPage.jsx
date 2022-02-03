import React, {useEffect, useState} from "react";
import HOCs from "../HOCs";
import {withRouter} from "react-router-dom";
import SimpleViewerContainer from "./SimpleViewerContainer";
import {Button, ButtonGroup, Typography} from "@mui/material";
import {loadLabById} from "./simpleViewerHelper";


function SimpleViewerPage(props) {
    const params = props?.match?.params;
    const [examples, setExamples] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([document.getElementById('simpleEditor').value], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "myCode.txt";
        document.body.appendChild(element);
        element.click();
    }


    useEffect(() => {
        async function loadLab() {
            if (!examples && params?.labId) {
                setIsLoading(() => true)
                const lab = await loadLabById(params?.labId)
                if (!!lab) {
                    setExamples(lab.exampledata.map((labInfo) => labInfo.text))
                }
                setIsLoading(() => false)
            }
        }

        if (params.labId) {
            loadLab();
        }
    }, [])


    return (
        <>
            {isLoading && <div className={"loading"} id={"overlay_loader"}/>}
            {
                !!params?.labId
                    ? <div>
                        {
                            !!examples
                                ?
                                <SimpleViewerContainer
                                    examplesArray={examples}
                                />
                                : (!isLoading && !examples)
                                    ? "Такой работы нет. Или у этой работы нет примеров"
                                    : `Lab id ${params?.labId}. Loading...`
                        }
                    </div>
                    : <SimpleViewerContainer
                        title={"Простой редактор"}
                        examplesArray={["Input code here"]}
                    />
            }

            {
                !params?.labId &&
                <Typography
                    className={"d-flex justify-content-left"}
                >
                    <ButtonGroup>
                        <Button
                            onClick={downloadTxtFile}
                        >Скачать исходный файл (.txt)</Button>
                    </ButtonGroup>
                </Typography>
            }
        </>
    )
}


export default HOCs.withHeader(withRouter(SimpleViewerPage));