import React from 'react';
import './App.css';
import MainPage from "./main-page/MainPage";
import {Route} from "react-router-dom";
import OnlineEditorContainer from "./components/online-editor-iframe/OnlineEditorContainer";
import AdminPageContainer from "./admin-panel/AdminPageContainer";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const BASE_PATH = "/"
export const IDE_PATH = "/ide"
const ADMIN_PANEL = "/admin_panel"

function App() {

    return (
        <div className="App">
            <Route exact path={BASE_PATH} component={MainPage}/>
            <Route exact path={IDE_PATH} component={OnlineEditorContainer}/>
            <Route exact path={ADMIN_PANEL} component={AdminPageContainer}/>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
