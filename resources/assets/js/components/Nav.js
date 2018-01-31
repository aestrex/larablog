import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <nav className="light-blue lighten-1" role="navigation">
                <div className="nav-wrapper container"><Link className="brand-logo" id="logo-container" to="/">Logo</Link>
                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/admin">Dashboard</Link></li>
                    </ul>

                    <ul id="nav-mobile" className="side-nav">
                        <li><Link to="/admin">Dashboard</Link></li>
                    </ul>
                    <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                </div>
            </nav>
        );
    }
}

export default Nav;