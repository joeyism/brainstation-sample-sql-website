import React, { Component } from 'react';
import * as userActions from '../actions/users';
import StoreInstance from '../store';


class AddUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            "first_name":"",
            "last_name": ""
        };
    }

    updateFirstName = (name) => {
        this.setState((state)=>{
            return {
                "first_name": name,
                "last_name": state.last_name
            }
        })
    }

    updateLastName = (name) => {
        this.setState((state)=>{
            return {
                "first_name": state.first_name,
                "last_name": name
            }
        })
    }

    addUser = () =>{
        var that = this;
        fetch("/api/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(function(res){
            if (res.status === 200){
                console.log("dispatching", that.state);
                StoreInstance.dispatch(userActions.addUser(that.state));       
            }
        });
    }

    render(){

        return (
            <div className="bs-example add-yourself-div">
                <div className="add-yourself-text">
                    Add yourself to the database!
                </div>
                <div>
                    <input type="text" placeholder="First Name"
                        onChange= {(e)=> this.updateFirstName(e.target.value)}
                        className="form-control"
                    />
                    <input type="text" placeholder="Last Name"
                        onChange= {(e)=> this.updateLastName(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-default" onClick={ this.addUser}>Submit</button>

            </div>
            );
    }

}

export default AddUsers;
