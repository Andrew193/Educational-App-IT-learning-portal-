import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import SimpleCodeViewer from "./SimpleCodeViewer";


function SimpleViewerContainer(props) {
    const {
        examplesArray
    } = props;
    const [examplesText, setExamplesText] = useState([]);

    useEffect(() => {
        if (examplesArray) {
            examplesArray.forEach((test) => {
                fetch(test)
                    .then((r) => r.text())
                    .then(text => {
                        setExamplesText((state) => ([...state, text]))
                    })
            })

        }
    }, [examplesArray])

    return (
        <Box>
            {examplesText.map((example, index) => (
                <>
                    <h3>Пример №{index + 1}</h3>
                    <SimpleCodeViewer codeFromProps={example}/>
                </>
            ))}
        </Box>
    )
}

export default SimpleViewerContainer;