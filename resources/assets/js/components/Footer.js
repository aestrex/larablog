import React, { Component } from 'react';

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

export default Footer;