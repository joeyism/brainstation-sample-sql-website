import React, { Component } from 'react';
import 'whatwg-fetch';
import ShowUsers from './components/showUsers';
import AddUsers from './components/addUsers';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './actions/users';
import StoreInstance from './store';


class Users extends Component {
    constructor(props){
        super(props);
        this.state= {
            loading: true
        };

        var that = this;
        fetch("/api/users").then(function(response){
            return response.json();
        }).then(function(users){
            users.forEach(function(user){
                StoreInstance.dispatch(userActions.addUser(user));
            });
            that.setState( (prev) => {
                return {
                    users: prev.users,
                    loading: false
                }
            });
        });

        StoreInstance.subscribe(() => {
            this.setState((prev)=> ({
                users: StoreInstance.getState().users,
                loading: prev.loading
            }));
        });
    }

    render() {
        if (this.state.loading){
            return (<div> Loading...</div>)
        }

        return (
            <div className="user-container">
            < ShowUsers users = {this.state.users}/>
            < AddUsers users = {this.state.users}/>
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
