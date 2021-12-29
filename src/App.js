import React from 'react';
import './App.css';
import MainPage from "./main-page/MainPage";
import {Route} from "react-router-dom";
import OnlineEditorContainer from "./components/online-editor-iframe/OnlineEditorContainer";

const BASE_PATH = "/"
export const IDE_PATH = "/ide"

function App() {
    return (
        <div className="App">
            <Route exact path={BASE_PATH} component={MainPage}/>
            <Route exact path={IDE_PATH} component={OnlineEditorContainer}/>
        </div>
    );
}

export default App;
