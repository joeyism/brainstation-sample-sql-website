import React, { Component } from 'react';
import 'whatwg-fetch';
import "../App.css";
import * as ReactBootstrap from 'react-bootstrap';
import StoreInstance from '../store';
import * as currentuserActions from '../actions/currentuser';

class ShowUsers extends Component {
    constructor(props){
        super(props);

   }

   setCurrentUser(user) {
       var that = this;
       StoreInstance.dispatch(currentuserActions.setCurrentUser(user));       
   }

   render() {
        if (!this.props.users){
            return(<div></div>)
        }

       const userList = this.props.users.map((item, idx) => {
           item.id = idx;
           return <li className={"App eachUser " + ( (this.props.currentuser)? (this.props.currentuser.id === idx ? "currentuser": "not-currentuser"): "not-currentuser") } key={idx} onClick={ () => this.setCurrentUser(item) }> {item.first_name} {item.last_name}</li>
       });

       return (
           <div className="row">
           <div className="col-md-4 col-xs-4 col-lg-4"> </div>
           <div className="App col-md-4 col-xs-4 col-lg-4">
           <div className="list-people-text"> 
           <h4>List of people in this class</h4>
           </div>
           <ul className="user-list">
           { userList }
           </ul>
           </div>
           <div className="col-md-4 col-xs-4 col-lg-4"> </div>
           </div>
       );
   }
}

export default ShowUsers;
