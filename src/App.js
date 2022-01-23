import React from 'react';
import './App.css';
import './header.css';
import './utils.css';
import './spinner.css';
import MainPage from "./main-page/MainPage";
import {Route} from "react-router-dom";
import OnlineEditorContainer from "./components/online-editor-iframe/OnlineEditorContainer";
import AdminPageContainer from "./admin-panel/AdminPageContainer";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import LoginPageContainer from "./loogin_page/LoginPageContainer";
import UsersPageContainer from "./users-page/UsersPageContainer";

const BASE_PATH = "/"
export const IDE_PATH = "/ide"
export const LOGIN_PAGE = "/login"
const USERS_PAGE = "/users"
const ADMIN_PANEL = "/admin_panel"

function App() {

    return (
        <div className="App">
            <Route exact path={BASE_PATH} component={MainPage}/>
            <Route exact path={LOGIN_PAGE} component={LoginPageContainer}/>
            <Route exact path={IDE_PATH} component={OnlineEditorContainer}/>
            <Route exact path={USERS_PAGE} component={UsersPageContainer}/>
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
