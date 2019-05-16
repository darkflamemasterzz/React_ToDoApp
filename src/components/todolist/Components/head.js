import React from 'react';
import './head.css'

function Head(props) {
    return(
        <div id="container">
            <p className="title">{props.Title}</p>
            <span 
                className="button"
                style={props.isDisplay}
                onClick={props.AddToDo}
            ></span>
        </div>
    )
};

export default Head;