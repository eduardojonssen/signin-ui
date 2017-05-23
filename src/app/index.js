import React from 'react';
import { render } from 'react-dom';

import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

require('../css/style.css');

class App extends React.Component {
    render() {
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2 col-xs-12 col-xs-offset-0">
                            FlipConnect
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));