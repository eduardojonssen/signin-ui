import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as api from '../../js/connect.js'; 

export class ApproveForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            merchantName: null,
            logoUrl: null,
            permissions: []
        }
    }
    denyPermissions() {
        window.location = api.queryParameters().redirectUri + '?reason=userAborted';
    }
    componentDidMount() {
        // fetch('http://dlp-qrservices.cloudapp.net:20114/system/merchants/' + api.queryParameters().clientId + '/settings')
        // .then((response) => {
        //     return response.json();
        // }).then((response) => {
        //     this.setState({
        //         merchantName: response.settings.merchantName,
        //         logoUrl: response.settings.logoUrl
        //     });
        // });

        fetch('http://dlp-qrservices.cloudapp.net:20114/system/merchants/' + api.queryParameters().clientId + '/permissions', {headers : {'Accept-Language': 'pt-BR'}})
        .then((response) => {
            return response.json();
        }).then((response) => {
            var indents = [];
            const list = response.merchantPermissionDataCollection;            
            const dataList = list.map(data => {
                return (
                    <div className="row" style={{'borderBottom': '1px solid #eeeeee'}}>
                        <div className="col-xs-10">
                            <div className="row">
                                <div className="col-xs-12 permissionCategory">
                                    {data.categoryFriendlyName}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 permissionCategoryDetails">
                                    {data.mandatoryFieldsFriendlyName + ', '}
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-2" style={{'padding':20 + 'px','textAlign':'right'}}>
                            <input type="checkbox" name="approvedCategories" value={data.categoryName} defaultChecked disabled={data.isMandatory == true ? 'disabled' : '' } />
                        </div>
                    </div>
                );
            });
            this.setState({
                permissions: dataList
            });
        });
    }
    render() {
        return (
            <div>
                <center>
                    <h4>Precisamos da sua permissão</h4>
                    <p className="note">Olá {this.state && <b>{this.state.name}</b>}! <b>{this.props.merchant.name}</b> precisa da sua permissão para acessar as seguintes informações:</p>
                </center>
                <div id="uxLblError" className="alert alert-danger hidden">
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div id="permissionsRequested" className="permissionsArea">
                            {this.state.permissions}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <center>
                            <input type="button" className="btn btn-danger button button-spaced" value="Negar" onClick={this.denyPermissions.bind(this)}/>                            
                            <input type="button" className="btn btn-success button button-spaced" value="Aprovar"/>
                        </center>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        merchant: state
    };
};

export default withRouter(connect(mapStateToProps, {})(ApproveForm));