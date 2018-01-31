import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

class Post extends Component {
    truncate(str, no_words) {
        return str.split(" ").splice(0,no_words).join(" ");
    }

    render() {
        return (
            <div className="col s12 m6">
                <div className="card horizontal">
                    <div className="card-stacked">
                        <div className="card-content">
                            <h2>{this.props.post.title}</h2>
                            <p>{ this.truncate(this.props.post.body, 50) + " ..." }</p>
                        </div>
                        <div className="card-action">
                            <Link to={"/posts/" + this.props.post.id}>Read More</Link>
                            {/* <a href="#">Read More</a> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PostList extends Component {
    render() {
        return (
            <div>
                {this.props.posts.map((post) => {
                    return <Post key={post.id} post={post} />
                })}
            </div>
        );
    }
}

class BlogDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        axios.get('/api/posts')
            .then((response) => {
                this.setState({
                    posts: response.data
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                <Banner />

                <div className="container">
                    <div className="section">
                        <div className="row">
                            <PostList posts={this.state.posts}/>
                        </div>
                    </div>
                    <br /><br />
                </div>
            </div>
        );
    }
}

export default BlogDashboard;