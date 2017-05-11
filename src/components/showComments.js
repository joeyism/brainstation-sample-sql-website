import React, { Component } from 'react';
import 'whatwg-fetch';
import StoreInstance from '../store';

class ShowComments extends Component {
    constructor(props){
        super(props);
    }


    render(){
        if (!this.props.comments){
            return(<div></div>)
        }

        console.log(this.props.comments);
        const commentList = this.props.comments.map((item, idx) => {
            return <li className="each-comment" key={idx}>{item.first_name} {item.last_name}: {item.comment} </li>
        }); 

        return(
            <div className="comments-div">
            <div className="comments-header"> Comments you have made: </div>
            <ol>    
            { commentList }
            </ol>
            </div> 
        )
    }
}

export default ShowComments;
