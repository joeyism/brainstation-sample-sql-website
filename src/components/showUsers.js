import React, { Component } from 'react';
import 'whatwg-fetch';
import "../App.css";
import * as ReactBootstrap from 'react-bootstrap';

class ShowUsers extends Component {
    constructor(props){
        super(props);

   }

    render() {
        const userList = this.props.users.map((item, idx) => {
            return <li className="App" key={idx}> {item.first_name} {item.last_name}</li>
        });

        return (
            <div className="row">
                <div className="col-md-4 col-xs-4 col-lg-4"> </div>
                <div className="App col-md-4 col-xs-4 col-lg-4">
                    <div className="list-people-text"> List of people in this class</div>
                    <ol>
                        { userList }
                    </ol>
                </div>
                <div className="col-md-4 col-xs-4 col-lg-4"> </div>
            </div>
        );
    }
}

export default ShowUsers;
