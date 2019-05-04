import React from 'react';
// import ReactDOM from 'react-dom';
import './ToDoItem.css';

class ToDoItem extends React.Component{
    constructor(props){
        super(props);
        this.clickCheckBox = this.clickCheckBox.bind(this);
        this.Modify_ToDoItem = this.Modify_ToDoItem.bind(this);
    };
    clickCheckBox(){
        this.props.clickCheckBox(this.props.keyNum);
    }
    Modify_ToDoItem(){
        this.props.Modify(this.props.keyNum)
    }
    render(){
        const durations={
            "0": '<30min',
            "1": '30min~2h',
            "2": '2~4h',
            "3": '>4h',
        }
        const checkBoxStyle = this.props.isDone ? {} :{
            background: "url('') no-repeat",
            backgroundSize: "cover",
        }
        return(
            <div> 
                <div className="ItemCheckbox" onClick={this.clickCheckBox} style={checkBoxStyle}></div>             
                <p className="singleItem scrollbar square scrollbar-lady-lips thin" onClick={this.Modify_ToDoItem}>
                    {this.props.content}
                    <span className="tag">{this.props.gradeLevel}</span>
                    <span className="tag">{durations[this.props.duration]}</span>
                </p>
            </div>
        ) 
    };
};

export default ToDoItem;