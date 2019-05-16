import React, { Component } from 'react';
import Form from './Components/Form';
import Head from './Components/head';
import ToDoItem from './Components/ToDoItem';
import Bookmark from './Components/Bookmark';
import './ToDoList.css';


class ToDoList2 extends Component {
    constructor(props){
        super();
    }

    render() {
        // 利用是否处于显示表单状态控制 添加按钮、todoitem等元素的可见性
        const isShowingForm = this.props.formIsVisible;
        let isDisplay;
        if (isShowingForm){
            isDisplay = {display: "none"};
        }else{
            isDisplay = {};
        };
        return (
            <div id="container" style={this.props.ToDoListShouldDisplay ? {}:{display:"none"}}>
                <Head AddToDo = {this.props.showFormHandle} Title={this.props.Title} isDisplay={isDisplay}/>
                <Bookmark 
                    moveBookmark={this.props.moveBookmark }
                    moveBackBookmark={this.props.moveBackBookmark}
                    StartTimeHandle={this.props.StartTimeHandle}
                    GradeLevelHandle={this.props.GradeLevelHandle}
                    DurationHandle={this.props.DurationHandle} 
                />
                    <div className="TestBackground">
                        <div className="ToDoItemsContainer" style={isDisplay}>
                        {
                            this.props.ToDoItems.map((item, index) => 
                                <ToDoItem key={index} 
                                    keyNum={index}
                                    isDone={item.isDone} 
                                    content={item.content} 
                                    gradeLevel={item.gradeLevel}
                                    duration={item.duration} 
                                    clickCheckBox={this.props.clickCheckBox}
                                    Modify={this.props.Modify}
                                />   
                            )
                        } 
                        </div>
                        {
                        this.props.formIsVisible === true ? 
                        <Form 
                            AddContentHandle={this.props.AddContentHandle}
                            GradeLevelHandle={this.props.GradeLevelHandle}
                            DurationHandle={this.props.DurationHandle}
                            Submit={this.props.Submit}
                            placeholder={
                                this.props.isModifyState.isModify ? 
                                    this.props.ToDoItems[this.props.isModifyState.key].content:
                                    "请输入你的待办事项"
                            }
                        />
                        : null
                        }
                    
                    </div>
                    <span className="del" onClick={this.props.DelItems}></span>
            </div>
        );
    }
}

export default ToDoList2;