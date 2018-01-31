import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import BlogDashboard from './BlogDashboard';
import PostDashboard from './PostDashboard';

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';

 class Nav extends Component {
    render() {
        return (
            <nav className="light-blue lighten-1" role="navigation">
                <div className="nav-wrapper container"><Link className="brand-logo" id="logo-container" to="/">LB</Link>
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

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer orange">
                <div className="footer-copyright">
                    <div className="container">
                        Made by <a className="orange-text text-lighten-3" href="http://github.com/aestrex">David Alamu</a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Nav />

                    <Route exact path="/" component={BlogDashboard}/>
                    <Route path="/posts/:postId" component={PostDashboard}/>
                    {/* <Route path="/admin" component={AdminDashboard} /> */}

                    <Footer />
                </div>
            </Router>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
