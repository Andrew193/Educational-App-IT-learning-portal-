import React from 'react';
import './styles/App.css';
import './styles/header.css';
import './styles/utils.css';
import './styles/spinner.css';
import './styles/user_page.css';
import MainPage from "./main-page/MainPage";
import {Route} from "react-router-dom";
import OnlineEditorContainer from "./components/online-editor-iframe/OnlineEditorContainer";
import AdminPageContainer from "./admin-panel/AdminPageContainer";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import LoginPageContainer from "./loogin-page/LoginPageContainer";
import UsersPageContainer from "./users-page/UsersPageContainer";
import UserPageContainer from "./user-page/UserPageContainer";
import {Pages} from "./vars";
import ProtectedRoute from "./components/ProtectedRoute";

const ROUT_USER_ID_PLACEHOLDER = "/:userId?";
const GROUP = "/usergroup(\\d+)?";

export const BASE_PATH = Pages.BASE
export const IDE_PATH = Pages.IDE
export const LOGIN_PAGE = Pages.LOGIN
export const USERS_PAGE = Pages.USERS
const USER_PAGE = Pages.USER + ROUT_USER_ID_PLACEHOLDER
const ADMIN_PANEL = Pages.ADMIN_PANEL

function App() {

    return (
        <div className="App">
            <ProtectedRoute exact path={BASE_PATH} component={MainPage}/>
            <Route exact path={LOGIN_PAGE} component={LoginPageContainer}/>
            <ProtectedRoute exact path={IDE_PATH} component={OnlineEditorContainer}/>
            <ProtectedRoute exact path={USERS_PAGE} component={UsersPageContainer}/>
            <ProtectedRoute path={USER_PAGE} component={UserPageContainer}/>
            <ProtectedRoute exact path={ADMIN_PANEL} component={AdminPageContainer}/>
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
