import React, { Component } from 'react';
import 'whatwg-fetch';

class addComments extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: ""
        };
    }

    updateComment = (comment) => {
        this.setState((state)=> {
            return {
                comment: comment
            }
        });
    }

    addComment = () => {
        var that = this;
        fetch("/api/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comment: that.state.comment,
                currentuser: that.props.currentuser
            })
        }).then(function(res){
            if (res.status === 200){
                return fetch("/api/comments")
            }
        }).then(function(res){
            return res.json(); 
        }).then(function(comments){
            location.reload();
        });
    }

    render(){

        return(
            <div className="bs-example">
            <div className="add-yourself-text">
            Add comments
            </div>
            <div>
            <textarea rows="4" cols="50" placeholder="Add Comment"
            onChange= {(e)=> this.updateComment(e.target.value)}
            className="form-control"
            />
            </div>
            <button className="btn btn-default" onClick={ this.addComment}>Submit</button>

            </div>

        ); 
    }
}

export default addComments;
