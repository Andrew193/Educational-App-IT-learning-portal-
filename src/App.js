import React, {useEffect, useState} from 'react';
import './App.css';
import MainPage from "./main-page/MainPage";
import {Route} from "react-router-dom";
import OnlineEditorContainer from "./components/online-editor-iframe/OnlineEditorContainer";
import AdminPageContainer from "./admin-panel/AdminPageContainer";

const BASE_PATH = "/"
export const IDE_PATH = "/ide"
const ADMIN_PANEL = "/admin_panel"

function App() {
    const [fileSrc, setFileSrc] = useState("");

    useEffect(() => {
        fetch("https://qwertyblut.herokuapp.com/api/labs/")
            .then((response) => {
                var binaryData = [];
                binaryData.push(response);
                const url = window.URL.createObjectURL(new Blob(binaryData))

                setFileSrc(url.slice(5))
                console.log(response, url)
            })
    }, [])

    return (
        <div className="App">
            <iframe
                width="100%"
                height="600"
                frameBorder="0"
                src={`https://docs.google.com/gview?url=${fileSrc}&embedded=true`}
            />
            <Route exact path={BASE_PATH} component={MainPage}/>
            <Route exact path={IDE_PATH} component={OnlineEditorContainer}/>
            <Route exact path={ADMIN_PANEL} component={AdminPageContainer}/>
        </div>
    );
}

export default App;
