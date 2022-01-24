import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import {store} from './app/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";

export const AdminEmail = "sadovinskiy@gmail.com";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);


serviceWorker.unregister();
