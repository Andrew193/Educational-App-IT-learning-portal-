import React, {useEffect, useState} from "react";
import {Box, Paper} from "@material-ui/core";


function OnlineEditor() {
    const [isCreated, setIsCreated] = useState(false);
    const codeSandBoxUrlPath = "https://codesandbox.io/s/"

    useEffect(() => {
        if (!isCreated) {
            setIsCreated(true);
        }
    }, [])

    return (
        <Box
            m={3}
            p={3}
        >
            {isCreated && <iframe
                src={codeSandBoxUrlPath}
                width={"100%"}
                height={"100%"}
                style={{
                    minHeight: "800px",
                    padding: "20px 10px"
                }}
            />}
        </Box>
    )
}

export default OnlineEditor;