import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bulma/css/bulma.css';
import 'bulma/css/bulma.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './index.css'
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redusers";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>,
);
