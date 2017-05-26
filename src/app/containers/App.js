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
            if(response && response.settings) {
                this.props.setMerchantName(response.settings.merchantName);
                this.props.setMerchantLogoUrl(response.settings.logoUrl);
            }
        });

        fetch('http://dlp-qrservices.cloudapp.net:20115/user/account', {credentials: 'include'})
        .then((response) => {
            return response.json();
        }).then((response) => {
            if(response && response.account && response.account.name) {
                this.props.setUserName(response.account.name);
            }
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
        },
        setUserName: (name) => {
            dispatch({
                type: "SET_USER_NAME",
                payload: name
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);