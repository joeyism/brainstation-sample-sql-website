import React, { Component } from 'react';
import 'whatwg-fetch';
import ShowUsers from './components/showUsers';
import AddUsers from './components/addUsers';
import ShowComments from './components/showComments';
import AddComments from './components/addComments';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './actions/users';
import * as addComments from './actions/addComments';
import StoreInstance from './store';


class Users extends Component {
    constructor(props){
        super(props);
        this.state= {
            loading: true,
            currentuser: {},
            comments: []
        };

        var that = this;
        fetch("/api/users").then(function(response){
            return response.json();
        }).then(function(users){
            users.forEach(function(user){
                StoreInstance.dispatch(userActions.addUser(user));
            });

            return fetch("/api/comments");
        }).then(function(response){
            return response.json();
        }).then(function(comments){
            that.setState((prev) => {
                return {
                    users: prev.users,
                    loading: false,
                    currentuser: prev.currentuser,
                    comments: comments
                }
            });

        });

        StoreInstance.subscribe(() => {
            this.setState((prev)=> ({
                users: StoreInstance.getState().users,
                loading: prev.loading,
                currentuser: StoreInstance.getState().currentuser.currentuser,
                comments: StoreInstance.getState().comments.comments
            }));
        });
    }

    render() {
        if (this.state.loading){
            return (<div> Loading...</div>)
        }

        return (
            <div className="user-container">
            < ShowUsers users = {this.state.users} currentuser = {this.state.currentuser} />
            < AddUsers users = {this.state.users}/>
            < ShowComments comments = {this.state.comments}/>
            < AddComments currentuser = { this.state.currentuser} comments = {this.state.comments}/>

            </div> 
        );
    }
}

function mapStateToProps(state, props){
    return {
        users: state.users
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
