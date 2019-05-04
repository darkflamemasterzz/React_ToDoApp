import React from 'react';
// import ReactDOM from 'react-dom';
import './ToDoList.css';
import ToDoItem from './Components/ToDoItem';

class ToDoList extends React.Component{
    constructor(){
        super();
        this.state = {
            Texts: [],
            "TempText":"",
            HeavyGrade: [],
            SpendTime: [],
            "TempSpendTime":"",
            visibility:false,  // 0 represent hidden , 1 represent visible
            ToDoItems: [],
        };
        this.showForm = this.showForm.bind(this);
        this.ChangeTempHandle_Text = this.ChangeTempHandle_Text.bind(this);
        this.submitForm = this.submitForm.bind(this);
    };
     // 表单相关事件
    // 显示表单
    showForm(){
        this.setState({
            visibility: !this.state.visibility,
        });
    };
    // 填写表单字段，改变state
    ChangeTempHandle_Text(e){
        const target = e.target;
        const name = target.name;
        this.setState({
            [name]: target.value,
        });
    };
    // 点击提交按钮
    submitForm(){
        let TextsArr = this.state.Texts;
        let SpendTimeArr = this.state.SpendTime;
        const that = this;
        TextsArr.push(this.state["TempText"]);
        SpendTimeArr.push(this.state["TempSpendTime"]);
        this.setState({
            Texts: TextsArr,
            SpendTime: SpendTimeArr,
            visibility: !this.state.visibility,
        })
        // 生成待办事项序列
        let ToDoItems = [];
        let length = this.state.Texts.length;
        const visibility = ["hidden","visible"];
        setTimeout(function(){
            let ItemIsVisibility = visibility[Number(!that.state.visibility)];
            console.log(ItemIsVisibility);
            for (var i =length-1; i>-1; i--){
                console.log(that.state.Texts[i])
                ToDoItems.push(<ToDoItem visibility={ItemIsVisibility} Content={that.state.Texts[i]} SpendTime={that.state.SpendTime[i]} />);
            }
            that.setState({
                ToDoItems: ToDoItems,
            });
            console.log(that.state.ToDoItems);
        },0)

    }

    render(){
        // 配合this.state.visibility控制 visibility样式
        const visibility = ["hidden","visible"];
        const formIsVisibility = visibility[Number(this.state.visibility)];
        const ItemIsVisibility = visibility[Number(!this.state.visibility)];
        const test = [<ToDoItem visibility={ItemIsVisibility} Content="hello" SpendTime="1" />, <ToDoItem visibility={ItemIsVisibility} Content="world" SpendTime="1" />];
        console.log(test);
        console.log(this.state.ToDoItems)
        return(
            <div id="container">
                {/*能不能把form放到别的组键中*/}
                <div className="todoForm" style={{visibility: formIsVisibility}} >
                    <label className="toDoContent">
                        内容：
                        <input
                            name="TempText"
                            type="text"
                            value={this.state["TempText"]}
                            onChange={this.ChangeTempHandle_Text}
                        />
                    </label>
                    {/*<label className="toDoGrade">
                        重要程度：
                        <select value={this.state.HeavyGrade[0]}>
                            <option value="green">green</option>
                            <option value="yellow">yellow</option>
                            <option value="red">red</option>
                        </select>
                    </label>*/}
                    {/*应该限制输入值类型为大于零小于144的数字*/}
                    <label className="toDoSpendTime">
                        工作长度：
                        <input
                            name="TempSpendTime"
                            type="text"
                            value={this.state["TempSpendTime"]}
                            onChange={this.ChangeTempHandle_Text}
                        />
                    </label>
                    <button className="submit" onClick={this.submitForm}>确定</button>
                </div>

                <button onClick={this.showForm} style={{color:"red"}} >add todo</button>
                {/*<ToDoItem visibility={ItemIsVisibility} Content={this.state.Texts[0]} SpendTime={this.state.SpendTime[0]} />*/}
                {/*遍历并输出待办事项*/}
                {this.state.ToDoItems}

            </div>
        )
    };
};

export default ToDoList;