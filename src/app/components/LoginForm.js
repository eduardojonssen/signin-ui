import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as api from '../../js/connect.js';

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.onLoginRequest = this.onLoginRequest.bind(this);
        this.onLoginComplete = this.onLoginComplete.bind(this);
    }
    onLoginComplete(response) {
        if (response) {
            if(response.success == true) {
                api.authorize(this.props.location.search, (response) => {
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
                });
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
    onLoginRequest(e) {
        "use strict";
        e.preventDefault();
        document.getElementById("uxLblError").classList.add("hidden");
        api.signin(this.props.location.search, e.target, this.onLoginComplete);
    }
    render() {
        return (
            <div>
                <center>
                    <h4>Informe seus dados de acesso</h4>
                    <p className="note">Você está no ambiente seguro FlipConnect. <b>{this.props.merchant.name}</b> precisa que você se autentique para continuar.</p>
                </center>
                <div id="uxLblError" className="alert alert-danger hidden">
                </div>
                <form method="POST" onSubmit={this.onLoginRequest}>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon" id="usename-addon"><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span></span>
                            <input type="text" className="form-control" id="uxTxtUsername" name="username" placeholder="E-mail, telefone ou CPF" aria-describedby="username-addon"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon" id="password-addon"><span className="glyphicon glyphicon-lock" aria-hidden="true"></span></span>
                            <input type="password" className="form-control" id="uxTxtPassword" name="password" placeholder="Senha" aria-describedby="password-addon"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 link">
                            <a href="#">Esqueceu sua senha?</a>
                        </div>
                        <div className="col-xs-6 actions">
                            <button type="submit" className="btn btn-success button">Entrar</button>
                        </div>
                    </div>
                </form>
                <center>
                    <p className="note">Ainda não possui uma conta FlipConnect?</p>
                    <button type="button" className="btn btn-primary button">Quero me cadastrar!</button>
                </center>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        merchant: state
    };
};

export default withRouter(connect(mapStateToProps, {})(LoginForm));