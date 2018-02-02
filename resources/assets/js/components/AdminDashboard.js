import React, { Component } from 'react';
import axios from 'axios';

class ViewPost extends Component {
    constructor(props) {
        super(props);

        this.onDeleteClicked = this.onDeleteClicked.bind(this);
    }

    onDeleteClicked() {
        this.props.deleteClicked(this.props.post.id);
    }

    render() {
        return (
            <div className="col s12 m8 offset-m2">
                <div className="card horizontal">
                    <div className="card-stacked">
                        <div className="card-content">
                            <h5>{this.props.post.title}</h5>
                        </div>
                        <div className="card-action">
                            <button 
                                className="btn waves-effect waves-light modal-close" 
                                data-target="modal1" 
                                type="submit" 
                                name="action" 
                                onClick={this.props.onEdit}>
                                    Edit <i className="material-icons right">edit</i>
                            </button> &nbsp;
                            <button 
                                className="btn waves-effect waves-light modal-close" 
                                data-target="modal1" 
                                type="submit" 
                                name="action" 
                                onClick={this.onDeleteClicked}>
                                    Delete <i className="material-icons right">delete</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PostEditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: ''
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.onUpdateClicked = this.onUpdateClicked.bind(this);
    }

    componentDidMount() {
        this.setState({
            title: this.props.post.title,
            body: this.props.post.body
        });
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleBodyChange(e) {
        this.setState({
            body: e.target.value
        });
    }

    onUpdateClicked() {
        this.props.onUpdate(
            this.props.post.id,
            this.state.title,
            this.state.body
        );
    }

    render() {
        return (
            <div>
                <div className="col s12 m6 offset-m3">
                    <h4 className="header">Edit Post</h4>
                    <div className="card horizontal">
                        <div className="card-stacked">
                            <div className="card-content">
                                <div className="row">
                                    <form className="col s12">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input 
                                                    id="title" 
                                                    type="text"
                                                    autoFocus
                                                    value={this.state.title}
                                                    onChange={this.handleTitleChange} />
                                                <label for="title">Title</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea 
                                                    id="textarea1"
                                                    className="materialize-textarea"
                                                    value={this.state.body}
                                                    onChange={this.handleBodyChange}></textarea>
                                                <label for="textarea1">Body</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card-action">
                                <button 
                                    className="btn waves-effect waves-light modal-close" 
                                    data-target="modal1" 
                                    type="submit" 
                                    name="action" 
                                    onClick={this.onUpdateClicked}>
                                        Update <i className="material-icons right">edit</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class EditablePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
    }

    handleEditClick() {
        this.setState({
            edit: true
        });
    }

    handleUpdateClick(id, title, body) {
        this.setState({
            edit: false
        });

        this.props.onUpdate({id, title, body});
    }

    render() {
        if (this.state.edit) {
            return (
                <PostEditForm 
                    onUpdate={this.handleUpdateClick} 
                    post={this.props.post} />
            )
        } else {
            return (
                <ViewPost 
                    onEdit={this.handleEditClick} 
                    post={this.props.post}
                    deleteClicked={this.props.deleteClicked} />
            );
        }
    }
}

class AdminPostsList extends Component {
    render() {
        return (
            <div className="row">
                {this.props.posts.map((post) => {
                    return <EditablePost 
                                post={post}
                                deleteClicked={this.props.deleteClicked}
                                onUpdate={this.props.onUpdate} />
                })}
            </div>
        );
    }
}

class AdminDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            title: '',
            body: ''
        }

        this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleModalCancelClick = this.handleModalCancelClick.bind(this);
        this.handlePostClick = this.handlePostClick.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        axios.get('/api/posts/')
            .then((response) => {
                this.setState({
                    posts: response.data
                });
            }).catch((error) => {
                console.error(error);
            });
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleBodyChange(e) {
        this.setState({
            body: e.target.value
        });
    }

    handleModalCancelClick() {
        this.setState({
            title: '',
            body: ''
        });
    }

    handleDeleteClicked(id) {
        axios.get(`/api/posts/${id}/delete`)
        .then((response) => {
            if (response.data.deleted === 1) {
                this.setState({
                    posts: response.data.posts
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    handleUpdate(post) {
        axios.post(`/api/posts/${post.id}/update`, {
            title: post.title,
            body: post.body
        }).then((response) => {
            if (response.data.updated === 1) {
                axios.get('/api/posts/')
                .then((response) => {
                    this.setState({
                        posts: response.data
                    });
                }).catch((error) => {
                    console.error(error);
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    handlePostClick() {
        $('#modal1').modal('close');

        axios.post('/api/posts', {
            title: this.state.title,
            body: this.state.body
        }).then((response) => {
            if (response.data.saved === 1) {
                axios.get('/api/posts/')
                .then((response) => {
                    this.setState({
                        posts: response.data
                    });
                }).catch((error) => {
                    console.error(error);
                });
            }
        }).catch((error) => {
            console.error(error);
        });

        this.setState({
            title: '',
            body: ''
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col m6 offset-m3">
                            <h1>Admin Dashboard</h1>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <br />
                    <div className="row">
                        <div className="col s12 m4 offset-m8">
                            <button 
                                className="btn waves-effect waves-light modal-trigger" 
                                data-target="modal1" 
                                type="submit" 
                                name="action" 
                                onClick={this.handleFormSubmit}>
                                    Create New Post <i className="material-icons right">add</i>
                            </button>

                            <div id="modal1" className="modal modal-fixed-footer">
                                <div className="modal-content">
                                    <h4>New Post</h4>
                                    <div className="row">
                                        <form className="col s12">
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input 
                                                        id="title" 
                                                        type="text" 
                                                        placeholder="Title"
                                                        value={this.state.title}
                                                        onChange={this.handleTitleChange} />
                                                    <label for="title">Title</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <textarea 
                                                        id="textarea1"
                                                        className="materialize-textarea" 
                                                        placeholder="Body"
                                                        onChange={this.handleBodyChange}
                                                        value={this.state.body}></textarea>
                                                    <label for="textarea1">Body</label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button 
                                        className="btn waves-effect waves-light modal-close" data-target="modal1" type="submit" name="action" onClick={this.handleModalCancelClick}>Cancel
                                    </button> &nbsp;
                                    <button 
                                        className="btn waves-effect waves-light" 
                                        type="submit" 
                                        name="action" 
                                        onClick={this.handlePostClick}>Post
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <br />
                    <AdminPostsList 
                        posts={this.state.posts} 
                        deleteClicked={this.handleDeleteClicked}
                        onUpdate={this.handleUpdate} />
                </div>
            </div>
        );
    }
}

export default AdminDashboard;