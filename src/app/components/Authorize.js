import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import * as api from '../../js/connect.js';

export class Authorize extends React.Component {
    constructor(props) {
        super(props);
        this.authorize = this.authorize.bind(this);
    }
    authorize(response) {
        "use strict";
        if (response) {
            if(response.success == true) {
                if(response.status === 'connected') {
                    window.location = response.redirectUri + '?code=' + response.authorizationCode;
                }
                else if(response.status === 'notAuthorized') {
                    this.props.history.push('/approve' + this.props.location.search);
                }
                else if(response.status === 'notConnected') {
                    this.props.history.push('/signin' + this.props.location.search);
                }
                else if(response.status === 'pendingData') {
                    this.props.history.push('/pending' + this.props.location.search);
                }
            }
            else {
                let msg = '<ul>';
                for(let i = 0; i < response.operationReport.length; i++) {
                    msg += '<li><b>' + response.operationReport[i].field + ':</b> ' + response.operationReport[i].message + '</li>';
                }
                msg += '</ul>';
                document.getElementById("uxLblError").innerHTML = msg;
                document.getElementById("uxLblError").classList.remove("hidden");
            }
        }
    }
    render() {
        return (
            <div>
                <div id="uxLblError" className="alert alert-danger hidden">
                </div>
                {api.authorize(this.props.location.search, this.authorize)}
            </div>
        );
    }
}