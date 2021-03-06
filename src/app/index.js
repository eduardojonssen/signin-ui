import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";

import App from "./containers/App";
import store from "./store";

import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

require('../css/style.css');

render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('app'));