import React, { Component } from 'react';
import Form from './Components/Form';
import Head from './Components/head';
import ToDoItem from './Components/ToDoItem';
import Bookmark from './Components/Bookmark';
import './ToDoList.css';


class ToDoList2 extends Component {
    constructor(){
        super();
        this.state = {
            tempItem: {isDone:false,content:"",gradeLevel:"很重要",duration:"0",startTime:null},
            isModifyState:{isModify:false, key:null},
            formIsVisible: false,
            ToDoItems: [],
        };
        this.Form_AddContentHandle = this.Form_AddContentHandle.bind(this);
        this.Form_GradeLevelHandle = this.Form_GradeLevelHandle.bind(this);
        this.Form_DurationHandle = this.Form_DurationHandle.bind(this);
        this.ClickSubmitButton = this.ClickSubmitButton.bind(this);
        this.showFormHandle = this.showFormHandle.bind(this);
        this.Modify_ToDoItem = this.Modify_ToDoItem.bind(this);
        this.Filter_StartTimeHandle = this.Filter_StartTimeHandle.bind(this);
        this.Filter_GradeLevelHandle = this.Filter_GradeLevelHandle.bind(this);
        this.Filter_DurationHandle = this.Filter_DurationHandle.bind(this);
        this.Bubble = this.Bubble.bind(this);
        this.DelItems = this.DelItems.bind(this);
        this.moveBookmark = this.moveBookmark.bind(this);
        this.moveBackBookmark = this.moveBackBookmark.bind(this);
        this.clickCheckBox = this.clickCheckBox.bind(this);
    }
    // 表单事件
    showFormHandle(){
        this.setState({
            formIsVisible: true,
        });
    }
    Form_AddContentHandle(e){
        const target = e.target;
        const value = target.value;
        this.setState({
            tempItem: {
                isDone: this.state.tempItem.isDone,
                content:value, 
                gradeLevel:this.state.tempItem.gradeLevel,
                duration: this.state.tempItem.duration,
                startTime: new Date().getTime(),
            },
        });
        // const that = this;
        // setTimeout(function(){console.log(that.state.tempItem)},0);
    }
    Form_GradeLevelHandle(e){
        const target = e.target;
        const value = target.value;
        this.setState({
            tempItem: {
                isDone: this.state.tempItem.isDone,
                content:this.state.tempItem.content, 
                gradeLevel:value,
                duration: this.state.tempItem.duration,
            },
        });
        // const that = this;
        // setTimeout(function(){console.log(that.state.tempItem)},0);
    };
    Form_DurationHandle(e){
        const target = e.target;
        const value = target.value;
        this.setState({
            tempItem: {
                isDone: this.state.tempItem.isDone,
                content:this.state.tempItem.content, 
                gradeLevel:this.state.tempItem.gradeLevel,
                duration: value,
                startTime: new Date().getTime(),
            },
        });
        // const that = this;
        // setTimeout(function(){console.log(that.state.tempItem)},0);
    };
    ClickSubmitButton(e){
        e.preventDefault();
        //先检测表单是否已被填写完毕
        if (this.state.tempItem.content && this.state.tempItem.gradeLevel){
            // 如果是执行更改ToDoItem操作
            if(this.state.isModifyState.isModify){
                const that = this;
                let newItems = this.state.ToDoItems.map((elem,index) => {
                    if (index === that.state.isModifyState.key){
                        return that.state.tempItem;
                    }else{
                        return elem;
                    }
                });
                this.setState({
                    ToDoItems: newItems,
                    formIsVisible: false,
                    isModifyState:{isModify:false, key:null},
                    tempItem: {isDone:false,content:"",gradeLevel:"很重要",duration:"0",startTime:null},
                });
            // 如果是执行添加操作
            }else{
                this.setState({
                    ToDoItems: [this.state.tempItem].concat(this.state.ToDoItems),
                    formIsVisible: false,
                    tempItem: {isDone:false,content:"",gradeLevel:"很重要",duration:"0",startTime:null},
                });
            };
            // const that = this;
            // setTimeout(function(){console.log(that.state.ToDoItems)},0);
        }else{
            alert("请先把表单填写完毕！");
        }
        
    };
    // 更改ToDoItem
    Modify_ToDoItem(keyNum){
        console.log(keyNum);
        this.setState({
            isModifyState: {isModify: true, key:keyNum},
            formIsVisible: true,
        });
        const that = this;
        setTimeout(function(){console.log(that.state.isModifyState)},0);
    }


    // 冒泡算法： 小的排前面，大的排后面
    Bubble(arra){
        var temp;
        for(var i=0;i<arra.length;i++){ //比较多少趟，从第一趟开始
            for(var j=0;j<arra.length-i-1;j++){ //每一趟比较多少次数
                if(arra[j]>arra[j+1]){
                    temp=arra[j];
                    arra[j]=arra[j+1];
                    arra[j+1]=temp;
                }
            }
        };
    return arra;
    }
    // 按创建时间排序ToDoItems
    Filter_StartTimeHandle(){
        let ToDoItems = this.state.ToDoItems;
        // let startTimeClub = ToDoItems.map((item)=> {
        //     return item.startTime;
        // });
        // console.log(startTimeClub)
        // let startTimeClub_AfterFilting = this.Bubble(startTimeClub);
        // console.log(startTimeClub_AfterFilting);
        for (let i=0; i<ToDoItems.length; i++){
            let temp;
            for(let j=0; j<ToDoItems.length-i-1; j++){
                if(ToDoItems[j].startTime > ToDoItems[j+1].startTime){
                    temp=ToDoItems[j];
                    ToDoItems[j]=ToDoItems[j+1];
                    ToDoItems[j+1]=temp;
                };
            };
        };
        console.log(ToDoItems);
        this.setState({
            ToDoItems: ToDoItems,
        });
    }

    // 按重要程度排序ToDoItems
    Filter_GradeLevelHandle(){
        let ToDoItems = this.state.ToDoItems;
        // 红 黄 绿 分别代表 "很重要","一般重要", "不重要"
        let red = [];
        let yellow = [];
        let green = [];

        // 遍历ToDoItems数组，把对应的ToDoItem丢到对应的 red yellow green bucket中
        for(let i=0; i<ToDoItems.length; i++){
            if(ToDoItems[i].gradeLevel==="很重要"){
                red.push(ToDoItems[i]);
            }else if(ToDoItems[i].gradeLevel==="一般重要"){
                yellow.push(ToDoItems[i]);
            }else{
                green.push(ToDoItems[i]);
            };
        }
        // 按 red yellow green 顺序把数组合并，引用到ToDoItems中去
        ToDoItems = red.concat(yellow).concat(green);
        console.log(ToDoItems);
        this.setState({
            ToDoItems: ToDoItems,
        });
    }
    
    // 按固定时长长度排序ToDoItems
    Filter_DurationHandle(){
        let ToDoItems = this.state.ToDoItems;
        let shorter = [];
        let short = [];
        let long = [];
        let longer = [];
        // 遍历ToDoItems数组，把对应的ToDoItem丢到对应的 short shorter long longer bucket中
        for(let i=0; i<ToDoItems.length; i++){
            if(ToDoItems[i].duration==="0"){
                shorter.push(ToDoItems[i]);
            }else if(ToDoItems[i].duration==="1"){
                short.push(ToDoItems[i]);
            }else if(ToDoItems[i].duration==="2"){
                long.push(ToDoItems[i]);
            }else{
                longer.push(ToDoItems[i]);
            }
        };
        // 按 short shorter long longer 顺序把数组合并，引用到ToDoItems中去
        ToDoItems = shorter.concat(short).concat(long).concat(longer);
        this.setState({
            ToDoItems: ToDoItems,
        });
    }

    // 删除代办事项
    DelItems(){
        let ToDoItems = this.state.ToDoItems;
        let newItems = ToDoItems.filter((elem)=>{
            return (elem.isDone===false)
        });
        this.setState({
            ToDoItems: newItems,
        });
    }

    // 移动bookmark
    moveBookmark(e){
        const rgb = e.target.className[0];
        let target;
        // 看是 r g b的哪一个
        if (rgb === 'r'){
            target = document.getElementsByClassName("bookMarkContainer")[0];
        }else if(rgb === 'g'){
            target = document.getElementsByClassName("bookMarkContainer")[1];
        }else{
            target = document.getElementsByClassName("bookMarkContainer")[2];
        }

        const finalState = 450;
        const speed = 10;
        let targetLeft = 360; // 这里写死了，容易出问题

        clearInterval(timer);
        let timer = setInterval(function(){
            if(targetLeft === finalState){
                 clearInterval(timer);
             }else{
                targetLeft = targetLeft + speed;
                target.style.left = String(targetLeft)+"px";
             }
        },1);
    }
    moveBackBookmark(e){
        const rgb = e.target.className[0];
        let target;
        // 看是 r g b的哪一个
        if (rgb === 'r'){
            target = document.getElementsByClassName("bookMarkContainer")[0];
        }else if(rgb === 'g'){
            target = document.getElementsByClassName("bookMarkContainer")[1];
        }else{
            target = document.getElementsByClassName("bookMarkContainer")[2];
        }

        const finalState = 360;
        const speed = 10;
        let targetLeft = 450;

        clearInterval(timer);
        let timer = setInterval(function(){
            if(targetLeft === finalState){
                 clearInterval(timer);
             }else{
                targetLeft = targetLeft - speed;
                target.style.left = String(targetLeft)+"px";
             }
        },1);
    }
    // checkbox事件
    clickCheckBox(keyNum){
        const that = this;
        var newItems
        // 更新tempItem
        setTimeout(function(){
            that.setState({
                tempItem: {
                    isDone:!that.state.ToDoItems[keyNum].isDone,
                    content:that.state.ToDoItems[keyNum].content,
                    gradeLevel:that.state.ToDoItems[keyNum].gradeLevel,
                    duration:that.state.ToDoItems[keyNum].duration,
                    startTime:that.state.ToDoItems[keyNum].startTime,
                },
            });
        },0);
        // 遍历生成新的ToDoItems
        setTimeout(function(){
            let currentItems = that.state.ToDoItems;
            console.log(currentItems);
            console.log(keyNum);
            newItems = currentItems.map((elem, index) =>{
                if(keyNum === index){
                    return that.state.tempItem;
                }else{
                    return elem;
                }
            });
        },0);

        setTimeout(function(){
            that.setState({
                ToDoItems: newItems,
                tempItem: {
                    isDone:false,
                    content:"",
                    gradeLevel:"很重要",
                    duration:"0",
                    startTime:null
                },
            });
            console.log(that.state.ToDoItems)
        },0);
    }

    render() {
        // 利用是否处于显示表单状态控制 添加按钮、todoitem等元素的可见性
        // const visible={visibility:"visible"}
        const isShowingForm = this.state.formIsVisible;
        let isDisplay;
        if (isShowingForm){
            isDisplay = {display: "none"};
        }else{
            isDisplay = {};
        };
        return (
            <div id="container">
                <Head AddToDo = {this.showFormHandle} isDisplay={isDisplay}/>
                <Bookmark 
                    moveBookmark={this.moveBookmark }
                    moveBackBookmark={this.moveBackBookmark}
                    StartTimeHandle={this.Filter_StartTimeHandle}
                    GradeLevelHandle={this.Filter_GradeLevelHandle}
                    DurationHandle={this.Filter_DurationHandle} 
                />
                    <div className="TestBackground">
                        <div className="ToDoItemsContainer" style={isDisplay}>
                        {
                            this.state.ToDoItems.map((item, index) => 
                                <ToDoItem key={index} 
                                    keyNum={index}
                                    isDone={item.isDone} 
                                    content={item.content} 
                                    gradeLevel={item.gradeLevel}
                                    duration={item.duration} 
                                    clickCheckBox={this.clickCheckBox}
                                    Modify={this.Modify_ToDoItem}
                                />   
                            )
                        } 
                        </div>
                        {
                        this.state.formIsVisible === true ? 
                        <Form 
                            AddContentHandle={this.Form_AddContentHandle}
                            GradeLevelHandle={this.Form_GradeLevelHandle}
                            DurationHandle={this.Form_DurationHandle}
                            Submit={this.ClickSubmitButton}
                            placeholder={
                                this.state.isModifyState.isModify ? 
                                    this.state.ToDoItems[this.state.isModifyState.key].content:
                                    "请输入你的待办事项"
                            }
                        />
                        : null
                        }
                    
                    </div>
                    <span className="del" onClick={this.DelItems}></span>
            </div>
        );
    }
}

export default ToDoList2;