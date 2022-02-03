import React, {useEffect, useState} from "react";
import HOCs from "../HOCs"
import CustomizedAccordions from "../components/Accordion/Accordion";
import axios from "axios";
import {LABS_URL} from "../vars";
import {makeLabsList} from "./mainPageService";
import {useHistory} from "react-router-dom";

function MainPage(props) {
    const history = useHistory();
    const [accordionConfigObject, setAccordionConfigObject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const response = await axios.get(LABS_URL);

            if (`${response.status}`.startsWith("2")) {
                const parsedLabs = await makeLabsList(response, history);
                setAccordionConfigObject(parsedLabs)
                setIsLoading(false)
            }
        }

        getData();

    }, [])

    return (
        <>
            <h1
                style={{
                    marginTop: "unset"
                }}
            >Главная</h1>
            {isLoading && <div className={"loading"} id={"overlay_loader"}/>}

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