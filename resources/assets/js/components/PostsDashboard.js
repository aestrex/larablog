import React, { Component } from 'react';

class Banner extends Component {
    render() {
        return (
            <div className="section no-pad-bot" id="index-banner">
                <div className="container">
                <br /><br />
                <h1 className="header center orange-text">Our Latest Posts</h1>
                <div className="row center">
                    <h5 className="header col s12 light">Fresh, Undiluted and up-to-date information and gists.</h5>
                </div>
                <br /><br />

                </div>
            </div>
        );
    }
}

class PostList extends Component {
    render() {
        return (
            <div>
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        );
    }
}

class Post extends Component {
    render() {
        return (
            <div className="col s12 m6">
                <div className="card horizontal">
                    <div className="card-image">
                        <img src="http://placehold.it/100x253" />
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <h2>Horizontal Card</h2>
                            <p>I am a very simple card. I am good at containing small bits of information.</p>
                        </div>
                        <div className="card-action">
                            <a href="#">This is a link</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PostsDashboard extends Component {
    render() {
        return (
            <div>
                <Banner />

                <div className="container">
                    <div className="section">
                        <div className="row">
                            <PostList />
                        </div>
                    </div>
                    <br /><br />
                </div>
            </div>
        );
    }
}

export default PostsDashboard;