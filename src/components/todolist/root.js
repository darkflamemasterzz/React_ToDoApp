import React, { Component } from 'react';
import ListBar from './ListBar';
import ToDoList2 from './ToDoList2';
import './root.css'


class Root extends Component {
    constructor(){
        super();
        if(! localStorage.getItem('myState')){
            localStorage.setItem('myState', JSON.stringify({
                isShouldSave: false,
                isModifyState:{isModify:false, key:null},
                formIsVisible: false,
                tempItem: {isDone:false,content:"",gradeLevel:"很重要",duration:"0",startTime:null},
                // ToDoItems: [],
                tempList: {
                    title:"",
                    keyNum:null,
                    content:[],
                },
                ToDoLists: [],
                TitleInputShouldDisplay: false,
                ToDoListShouldDisplay: false,
                TitleDelButtonShowDisplay: {
                    targetClassName: "",
                    shouldDisplay: false,
                },
            }));
        };
        this.state = JSON.parse(localStorage.getItem('myState'));
        // Items' event
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
        this.AddToDoLists = this.AddToDoLists.bind(this);
        this.AddToDoLists_MakeSure = this.AddToDoLists_MakeSure.bind(this);
        this.EditTitle = this.EditTitle.bind(this);
        this.OpenToDoLists = this.OpenToDoLists.bind(this);
        this.CloseAndSave = this.CloseAndSave.bind(this);
        this.ToDoTitleOnHover = this.ToDoTitleOnHover.bind(this);
        this.ToDoTitleUnHover = this.ToDoTitleUnHover.bind(this);
        this.DelToDoList = this.DelToDoList.bind(this);
        
        // 添加搜索引擎
        let body = document.getElementsByTagName('body')[0];
        let script = document.createElement('script');
        script.className="SEScript"
        script.innerHTML=
        "(function() {"+
          "var cx = '015019912711329551411:dj4xrx1kxli';"+
          "var gcse = document.createElement('script');"+
          "gcse.type = 'text/javascript';"+
          "gcse.async = true;"+
          "gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;"+
          "var s = document.getElementsByTagName('script')[0];"+
          "s.parentNode.insertBefore(gcse, s);"+
          "console.log('run!')"+
        "})();"
        body.appendChild(script);
        console.log(document.getElementsByClassName('SEScript')[0]);
        let SearchEngine = document.createElement("gcse:search");
        console.log(SearchEngine);
        body.appendChild(SearchEngine);
    };
    //Items' event
    showFormHandle(){
        this.setState({
            isShouldSave: false,
            formIsVisible: true,
        });
    }
    Form_AddContentHandle(e){
        const target = e.target;
        const value = target.value;
        this.setState({
            isShouldSave: false,
            tempItem: {
                isDone: this.state.tempItem.isDone,
                content:value, 
                gradeLevel:this.state.tempItem.gradeLevel,
                duration: this.state.tempItem.duration,
                startTime: new Date().getTime(),
            },
        });
    }
    Form_GradeLevelHandle(e){
        const target = e.target;
        const value = target.value;
        this.setState({
            isShouldSave: false,
            tempItem: {
                isDone: this.state.tempItem.isDone,
                content:this.state.tempItem.content, 
                gradeLevel:value,
                duration: this.state.tempItem.duration,
            },
        });
    };
    Form_DurationHandle(e){
        const target = e.target;
        const value = target.value;
        this.setState({
            isShouldSave: false,
            tempItem: {
                isDone: this.state.tempItem.isDone,
                content:this.state.tempItem.content, 
                gradeLevel:this.state.tempItem.gradeLevel,
                duration: value,
                startTime: new Date().getTime(),
            },
        });
    };
    ClickSubmitButton(e){
        e.preventDefault();
        //先检测表单是否已被填写完毕
        if (this.state.tempItem.content && this.state.tempItem.gradeLevel){
            // 如果是执行更改ToDoItem操作
            if(this.state.isModifyState.isModify){
                const that = this;
                let newItems = this.state.tempList.content.map((elem,index) => {
                    if (index === that.state.isModifyState.key){
                        return that.state.tempItem;
                    }else{
                        return elem;
                    }
                });
                this.setState({
                    isShouldSave: true,
                    tempList: {title:this.state.tempList.title, keyNum:this.state.tempList.keyNum, content:newItems},
                    formIsVisible: false,
                    isModifyState:{isModify:false, key:null},
                    tempItem: {isDone:false,content:"",gradeLevel:"很重要",duration:"0",startTime:null},
                });
            // 如果是执行添加操作
            }else{
                this.setState({
                    isShouldSave: true,
                    tempList:{title:this.state.tempList.title, keyNum:this.state.tempList.keyNum, content:[this.state.tempItem].concat(this.state.tempList.content)},
                    formIsVisible: false,
                    tempItem: {isDone:false,content:"",gradeLevel:"很重要",duration:"0",startTime:null},
                });
            };
        }else{
            alert("请先把表单填写完毕！");
        }
        
    };
    // 更改ToDoItem
    Modify_ToDoItem(keyNum){
        this.setState({
            isShouldSave: false,
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
    // 按创建时间排序Items
    Filter_StartTimeHandle(){
        let ToDoItems = this.state.tempList.content;
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
        this.setState({
            isShouldSave: false,
            tempList: {title:this.state.tempList.title, keyNum:this.state.tempList.keyNum, content:ToDoItems}
        });
    }

    // 按重要程度排序ToDoItems
    Filter_GradeLevelHandle(){
        let ToDoItems = this.state.tempList.content;
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
        this.setState({
            isShouldSave: false,
            tempList: {title:this.state.tempList.title, keyNum:this.state.tempList.keyNum, content:ToDoItems}
        });
    }
    
    // 按固定时长长度排序ToDoItems
    Filter_DurationHandle(){
        let ToDoItems = this.state.tempList.content;
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
            isShouldSave: false,
            tempList: {title:this.state.tempList.title, keyNum:this.state.tempList.keyNum, content:ToDoItems}
        });
    }

    // 删除代办事项
    DelItems(){
        let ToDoItems = this.state.tempList.content;
        let newItems = ToDoItems.filter((elem)=>{
            return (elem.isDone===false)
        });
        // 更新ToDoLists
        let thisTitle = this.state.tempList.title
        let currentLists = this.state.ToDoLists;
        let newToDoLists = currentLists.map((elem)=>{
            if (elem.title === thisTitle){
              return {title:this.state.tempList.title, keyNum:this.state.tempList.keyNum, content:newItems};  
            }else{
                return elem
            };
        });
        // 更新tempList和ToDoLists
        this.setState({
            isShouldSave: true,
            tempList: {title:this.state.tempList.title, keyNum:this.state.tempList.keyNum, content:newItems},
            ToDoLists: newToDoLists,
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
                    isDone:!that.state.tempList.content[keyNum].isDone,
                    content:that.state.tempList.content[keyNum].content,
                    gradeLevel:that.state.tempList.content[keyNum].gradeLevel,
                    duration:that.state.tempList.content[keyNum].duration,
                    startTime:that.state.tempList.content[keyNum].startTime,
                },
            });
        },0);
        // 遍历生成新的Items
        setTimeout(function(){
            let currentItems = that.state.tempList.content;
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
                isShouldSave: true,
                // ToDoItems: newItems,
                tempList: {title:that.state.tempList.title, keyNum:that.state.tempList.keyNum, content: newItems},
                tempItem: {
                    isDone:false,
                    content:"",
                    gradeLevel:"很重要",
                    duration:"0",
                    startTime:null
                },
            });
        },0);
    }

    // Lists 'event

    // 添加待办事项列表
    AddToDoLists(){
        this.setState({
            isShouldSave: false,
            TitleInputShouldDisplay: true,
        });
    }
    EditTitle(e){
        let keyNum = this.state.ToDoLists.length;
        this.setState({
            isShouldSave: false,
            tempList: {
                title: e.target.value,
                keyNum:keyNum,
                content:[],
            },
        });
    }
    AddToDoLists_MakeSure(){
        let NewToDoLists = this.state.ToDoLists.concat(this.state.tempList);
        this.setState({
            isShouldSave: true,
            ToDoLists:NewToDoLists,
            TitleInputShouldDisplay: false,
            tempList:{
                title: "",
                keyNum:null,
                content: [],
            }
        });
    }

    // 打开待办事项列表
    OpenToDoLists(e){
        let keyNum = parseInt(e.target.className);
        // 根据keyNum 从ToDoLists数组读取数据写入tempList 显示待办事项
        this.setState({
            isShouldSave: false,
            tempList: this.state.ToDoLists[keyNum],
            ToDoListShouldDisplay: true,
        });
    }
    // 鼠标指向待办事项列表标题
    ToDoTitleOnHover(e){
        let className = e.target.className;
        this.setState({
            isShouldSave: false,
            TitleDelButtonShowDisplay: {
                targetClassName: className,
                shouldDisplay: true,
            },
        });
    }
    ToDoTitleUnHover(e){
        let className = e.target.className;
        this.setState({
            isShouldSave: false,
            TitleDelButtonShowDisplay: {
                targetClassName: className,
                shouldDisplay: false,
            },
        });
    }
    // 关闭并保存代办事项列表
    CloseAndSave(){
        let keyNum = this.state.tempList.keyNum;
        let prevLists = this.state.ToDoLists;
        let currentList = this.state.tempList
        let newToDoLists =  prevLists.map((elem, index)=>{
            // index === keyNum ? currentList : elem; 
            if (index === keyNum){
                return currentList;
            }else{
                return elem;
            };             
        });
        this.setState({
            isShouldSave: true,
            ToDoLists: newToDoLists,
            ToDoListShouldDisplay: false,
            tempList: {
                title:"",
                keyNum:null,
                content:[],
            },
        });
    }

    // 删除代办事项列表
    DelToDoList(e){
        e.stopPropagation();
        // 获取该代办事项列表的id
        let id = parseInt(e.target.id.slice(3));
        // 根据该id，在ToDoLists数组中删除该ToDoList
        let newToDoLists;
        let currentLists = this.state.ToDoLists;
        // newToDoLists = this.state.ToDoLists.map((elem, index)=>{
        //     return id === index ? null : elem;
        // });
        newToDoLists = currentLists.slice(0,id).concat(currentLists.slice(id+1));
        this.setState({
            isShouldSave: true,
            ToDoLists: newToDoLists,
        });
    };


    
    render() {
        // 把state同步到localStorage
        if(this.state.isShouldSave){
            localStorage.setItem('myState', JSON.stringify(this.state));
        };
        return (
            <div>      
                <div 
                    className="TempBackground" 
                    style={this.state.ToDoListShouldDisplay || this.state.TitleInputShouldDisplay ? {}:{display:"none"}}
                    onClick={this.CloseAndSave}
                ></div>
                <ToDoList2
                    ToDoListShouldDisplay={this.state.ToDoListShouldDisplay}
                    Title={this.state.tempList.title}
                    tempItem={this.state.tempItem}
                    isModifyState={this.state.isModifyState} 
                    formIsVisible={this.state.formIsVisible}
                    ToDoItems={this.state.tempList.content}
                    showFormHandle={this.showFormHandle}    
                    moveBookmark={this.moveBookmark }
                    moveBackBookmark={this.moveBackBookmark}
                    StartTimeHandle={this.Filter_StartTimeHandle}
                    GradeLevelHandle={this.Filter_GradeLevelHandle}
                    DurationHandle={this.Filter_DurationHandle}
                    clickCheckBox={this.clickCheckBox}
                    Modify={this.Modify_ToDoItem}
                    AddContentHandle={this.Form_AddContentHandle}
                    GradeLevelHandle={this.Form_GradeLevelHandle}
                    DurationHandle={this.Form_DurationHandle}
                    Submit={this.ClickSubmitButton}
                    DelItems={this.DelItems}
                />
                <ListBar 
                    ToDoLists={this.state.ToDoLists} 
                    OpenToDoLists={this.OpenToDoLists}
                    onClick={this.AddToDoLists}
                    ToDoTitleOnHover={this.ToDoTitleOnHover}
                    ToDoTitleUnHover={this.ToDoTitleUnHover}
                    DelShowDisplay={this.state.TitleDelButtonShowDisplay}
                    Del={this.DelToDoList}
                />
                {/* <button className="AddToDoLists" onClick={this.AddToDoLists}>add</button>
                <button className="DelToDoLists">del</button> */}
                <div className="Title_InputDIV">
                <input
                    name="Title_ToDoList"
                    className="Title_ToDoList"
                    type="text"
                    placeholder="请输入你待办事项列表的标题"
                    style={this.state.TitleInputShouldDisplay ? {}:{display: "none"}}
                    onChange={this.EditTitle}
                 />
                 <button 
                 className="AddToDoListTitle"
                 style={this.state.TitleInputShouldDisplay ? {}:{display: "none"}}
                 onClick={this.AddToDoLists_MakeSure}   
                 >确定</button>
                 </div>
                {/* <Form_AddList /> */}
                <div className="SearchEngineContainer">
                    <div className="SearchEngine"></div>
                </div>
            </div>
        );
    }
}

export default Root