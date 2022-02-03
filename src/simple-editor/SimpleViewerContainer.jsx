import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import SimpleCodeViewer from "../components/SimpleCodeViewer";


function SimpleViewerContainer(props) {
    const {
        examplesArray,
        title
    } = props;
    const [examplesText, setExamplesText] = useState([]);

    useEffect(() => {
        if (examplesArray) {
            setExamplesText(examplesArray)
        }
    }, [examplesArray])


    return (
        <Box>
            {examplesText.map((example, index) => (
                <>
                    <h3>{!!title ? title : `Пример №${index + 1}`}</h3>
                    <SimpleCodeViewer codeFromProps={example}/>
                </>
            ))}
        </Box>
    )
}

export default SimpleViewerContainer;