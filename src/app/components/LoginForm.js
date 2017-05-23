import React from "react";
import { BrowserRouter } from 'react-router-dom';

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.checkLoginStatus = this.checkLoginStatus.bind(this);
        this.onRequestLogin = this.onRequestLogin.bind(this);
    }
    checkLoginStatus() {
        "use strict";
        var url = "http://dlp-qrservices.cloudapp.net:20112/api/authorize" + this.props.location.search;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                var response = JSON.parse(xhr.responseText);
                if (response) {
                    if(response.success == true) {
                        if(response.status === 'connected') {
                            window.location = response.redirectUri + '?code=' + response.authorizationCode;
                            //this.props.history.push(response.redirectUri + '?code=' + response.authorizationCode);
                        }
                        else if(response.status === 'notAuthorized') {

                        }
                        else if(response.status === 'notConnected') {

                        }
                        else if(response.status === 'pendingData') {
                            
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
        }
        xhr.open('GET', url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.withCredentials = true;
        xhr.send();
    }
    onRequestLogin(e) {
        "use strict";
        e.preventDefault();
        document.getElementById("uxLblError").classList.add("hidden");
        var url = e.target.action;
        var formData = {};
        var data = $(e.target).serializeArray();
        for(let i = 0; i < data.length; i++) {
            formData[data[i].name] = data[i].value;
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                var response = JSON.parse(xhr.responseText);
                if (response) {
                    if(response.success == true) {
                        this.checkLoginStatus();
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
        }
        xhr.open(e.target.method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.withCredentials = true;
        xhr.send(JSON.stringify(formData));
    }
    render() {
        return (
            <div>
                <center>
                    <h4>Informe seus dados de acesso</h4>
                    <p className="note">Você está no ambiente seguro FlipConnect. Autentique-se para acessar sua conta.</p>
                </center>
                <div id="uxLblError" className="alert alert-danger hidden">
                    Erro
                </div>
                <form action={"http://dlp-qrservices.cloudapp.net:20112/api/signin" + this.props.location.search}  method="POST" onSubmit={this.onRequestLogin}>
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