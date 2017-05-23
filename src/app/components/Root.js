import React from 'react';

import { Header } from './Header';

export class Root extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2 col-xs-12 col-xs-offset-0">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}