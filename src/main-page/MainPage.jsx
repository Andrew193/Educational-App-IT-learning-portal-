import React, {useEffect, useState} from "react";
import PdfPreviewContainer from "../components/pdf/PdfPreviewContainer";
import HOCs from "../HOCs"
import CustomizedAccordions from "../components/Accordion/Accordion";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {IDE_PATH} from "../App";
import {importAll} from "../utils";
import SimpleViewerContainer from "../components/SimpleViewerContainer";

const labFiles = importAll(require.context('../labs/', false, /\.(pdf)$/));
const taskFiles = importAll(require.context('../tasks/', false, /\.(pdf)$/));
const testFiles = importAll(require.context('../examples/', false, /\.(txt)$/));

function MainPage() {
    const [accordionConfigObject, setAccordionConfigObject] = useState(null);
    const history = useHistory();

    useEffect(() => {
        setAccordionConfigObject(() => {
            const newAccordionConfig = {};
            const labs = Object.values(labFiles);
            const tasks = Object.values(taskFiles);
            const examples = Object.values(testFiles);

            labs?.forEach((lab, index) => {
                const labIndex = lab.default.split("/")[3].split(".")[0].replace(/\D+/g, "");
                let taskPath = null;
                let examplesArray = [];

                tasks.forEach((task) => {
                    const tempIndex = task.default.split("/")[3].split(".")[0].replace(/\D+/g, "");
                    if (tempIndex === labIndex) {
                        taskPath = task.default;
                    }
                })

                examples.forEach((task) => {
                    const tempIndex = task.default.split("/")[3].split(".")[0].replace(/\D+/g, "");
                    if (tempIndex === labIndex) {
                        examplesArray.push(task.default);
                    }
                })

                newAccordionConfig[index] = {
                    title: `Лабораторная работа №${labIndex}`,
                    content:
                        <CustomizedAccordions
                            accordionConfigObject={{
                                0: {
                                    title: "Лекция",
                                    content: <PdfPreviewContainer
                                        pdfFileSrc={lab.default}
                                    />
                                },
                                1: {
                                    title: "Практика",
                                    content:
                                        <>
                                            <PdfPreviewContainer
                                                pdfFileSrc={taskPath}
                                            />
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    history.push(IDE_PATH)
                                                }}
                                            >Начать онлайн!</Button>
                                        </>
                                },
                                2: {
                                    title: "Примеры",
                                    content: <SimpleViewerContainer
                                        examplesArray={examplesArray}
                                    />
                                }
                            }}
                        />
                }
            })
            return newAccordionConfig;
        })
    }, [])

    return (
        <>
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