import React from 'react';

export class Header extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <ul className="nav">
                            <li><img src="../imgs/logo.png" alt="FlipConnect" className="logo"/></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}