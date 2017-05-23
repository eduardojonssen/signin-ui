import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import * as api from '../../js/connect.js'; 

export class SignOut extends React.Component {
    constructor(props) {
        super(props);
        this.signout = this.signout.bind(this);
    }
    signout(response) {
        "use strict";
        if (response) {
            if(response.success == true) {
                this.props.history.push('/' + this.props.location.search);
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
                {api.signout(this.props.location.search, this.signout)}
            </div>
        );
    }
}