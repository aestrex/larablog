import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Nav from './Nav';
import Footer from './Footer';
import PostsDashboard from './PostsDashboard';

export default class Main extends Component {
    render() {
        return (
            <div>
                <Nav />

                <PostsDashboard />

                <Footer />
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
