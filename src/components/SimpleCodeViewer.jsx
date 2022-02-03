import React, {useEffect, useState} from "react";
import {Box, Paper} from "@mui/material";
import parse from 'html-react-parser';

function SimpleCodeViewer(props) {
    const {
        codeFromProps
    } = props;

    const [code, setCode] = useState(codeFromProps);
    const [reactElement, setReactElement] = useState();
    let consoleRef = React.useRef();
    let containerRef = React.useRef();
    let textareaRef = React.useRef();

    function runCode() {
        const reactElement = parse(code);
        if (React.isValidElement(reactElement)) {
            setReactElement(() => reactElement)
        } else {
            var console = {

                log: function (val) {
                    let paragraph = consoleRef.current;

                    paragraph.innerText = val;
                    paragraph.appendChild(document.createElement('br'));
                }
            }

            try {
                eval(code);
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        textareaRef.current.style.height = '1px';

        if (textareaRef.current.scrollHeight > containerRef.current.scrollHeight) {
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        } else {
            textareaRef.current.style.height = '100%';
        }
    }, [code, textareaRef, containerRef])

    return (
        <Box
            pt={0}
            pl={2}
            pr={2}
            className={"simpleContainer"}
        >
            <Paper
                elevation={3}
                ref={containerRef}
            >
            <textarea
                ref={textareaRef}
                defaultValue={code}
                onChange={(e) => {
                    const textareaValue = e.target.value;
                    setCode(() => textareaValue);
                }}
                id={"simpleEditor"}
            />

                <input
                    className={"runBtn"}
                    type="button"
                    value="Run"
                    onClick={runCode}
                />
            </Paper>
            <div
                className={"console"}
                id={"console"}
                ref={consoleRef}
            >
                {reactElement}
            </div>
        </Box>
    )
}

export default SimpleCodeViewer;