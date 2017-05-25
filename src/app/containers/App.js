import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { browserHistory } from "react-router";

import { Root } from '../components/Root';
import { Authorize } from '../components/Authorize';
import { SignOut } from '../components/SignOut';
import LoginForm from '../components/LoginForm';
import ApproveForm from '../components/ApproveForm';

import * as api from '../../js/connect.js';

export class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        fetch('http://dlp-qrservices.cloudapp.net:20114/system/merchants/' + api.queryParameters().clientId + '/settings')
        .then((response) => {
            return response.json();
        }).then((response) => {
            this.props.setMerchantName(response.settings.merchantName);
            this.props.setMerchantLogoUrl(response.settings.logoUrl);
        });
    }
    render() {
        return(
            <Router history={browserHistory} >
                <Root>
                    <Route exact path="/" component={Authorize} />
                    <Route path="/signin" component={LoginForm} />
                    <Route path="/signout" component={SignOut} />
                    <Route path="/approve" component={ApproveForm} />
                </Root>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {        
        merchant: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setMerchantName: (name) => {
            dispatch({
                type: "SET_MERCHANT_NAME",
                payload: name
            });
        },
        setMerchantLogoUrl: (url) => {
            dispatch({
                type: "SET_MERCHANT_LOGOURL",
                payload: url
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);