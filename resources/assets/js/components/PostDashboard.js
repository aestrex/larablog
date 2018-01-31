import React, { Component } from 'react';
import axios from 'axios';

class BlogPost extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="section no-pad-bot" id="index-banner">
                <div className="container">
                    <br /><br />
                    <h1 className="header center black-text">{this.props.post.title}</h1>
                    <div className="row center">
                        <p className="flow-text light">
                            {this.props.post.body}
                        </p>
                    </div>
                    <br /><br />
                </div>
            </div>
        );
    }
}

class CommentForm extends Component {
    render() {
        return(
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="textarea1" className="materialize-textarea"></textarea>
                                <label for="textarea1">Enter your comment</label>
                            </div>
                        </div>

                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

class Comment extends Component {
    render() {
        return (
            <li className="collection-item">{this.props.comment.body}</li>
        );
    }
}

class CommentList extends Component {
    render() {
        return (    
            <ul className="collection">
                {
                    this.props.comments.map((comment) => {
                        return <Comment comment={comment} />
                    })
                }
            </ul>
        );
    }
}

class CommentsDashboard extends Component {
    render() {
        return (
            <div>
                <div className="d jt offset-s2 jo offset-m3 blog-related">
                    <h4>Comments</h4>

                    <div className="container">
                        <CommentForm />

                        <CommentList comments={this.props.comments} />
                    </div>
                </div>
            </div>
        );
    }
}

class PostDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postId: '',
            post: {},
            comments: []
        }
    }

    componentDidMount() {
        this.setState({
            postId: this.props.match.params.postId
        }, function() {
            axios.get('/api/posts/' + this.state.postId)
                .then((response) => {
                    if (response.data.found === 1) {
                        this.setState({
                            post: response.data.post,
                            comments: response.data.comments
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    render() {
        return (
            <div>
                <BlogPost post={this.state.post} />
                <div className="eh"></div>
                <CommentsDashboard comments={this.state.comments} />
            </div>
        );
    }
}

export default PostDashboard;