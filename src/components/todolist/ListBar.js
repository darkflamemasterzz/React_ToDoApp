import React from 'react';
import './ListBar.css'

function ListBar(props) {
    let ToDoTitles = props.ToDoLists.map((elem, index)=>{
        return <span 
                    className={index} 
                    key={index} 
                    onClick={props.OpenToDoLists} 
                    onMouseEnter={props.ToDoTitleOnHover}
                    onMouseLeave={props.ToDoTitleUnHover}
                >{elem.title}
                    <span 
                        className="TitleDel"
                        id={"del"+index}
                        style={props.DelShowDisplay.shouldDisplay&&props.DelShowDisplay.targetClassName===String(index) ? 
                            {display:"inline-block"}:{} 
                        }
                        onClick={props.Del}
                    ></span>
                </span>
    });

    return (
        <div>
            <p id="listBar">
                <span className="listBarTitle" onClick={props.onClick}></span>
                {ToDoTitles}
            </p>
        </div>
    );
}


export default ListBar;

