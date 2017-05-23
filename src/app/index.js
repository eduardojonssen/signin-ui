import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Root } from './components/Root';
import { Authorize } from './components/Authorize';
import { SignOut } from './components/SignOut';
import { LoginForm } from './components/LoginForm';
import { ApproveForm } from './components/ApproveForm';

import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

require('../css/style.css');

render((
    <Router>
        <Root>
            <Route exact path="/" component={Authorize} />
            <Route path="/signin" component={LoginForm} />
            <Route path="/signout" component={SignOut} />
            <Route path="/approve" component={ApproveForm} />
        </Root>
    </Router>
), document.getElementById('app'));