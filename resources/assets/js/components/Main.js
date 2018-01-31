import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Nav from './Nav';
import Footer from './Footer';
import PostsDashboard from './PostsDashboard';

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';

export default class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Nav />

                    <Route exact path="/" component={PostsDashboard}/>
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
