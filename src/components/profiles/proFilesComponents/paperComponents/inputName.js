import React from 'react'
import InputModule from './inputModule'

class InputName extends InputModule{
    constructor(props){
        super(props)
        this.changeButton = this.changeButton.bind(this)
        this.setValue = this.setValue.bind(this)
        this.clickSubmit = this.clickSubmit.bind(this)
    }



    render(){
        if (this.state.ifChanging){
            // input填写表单
            return(
                <div id="nameInput" className="inputs">
                    <input
                        placeholder="输入你的名字"
                        className="inputBox"
                        name="name"
                        type="text"
                        value={this.state["name"]}
                        onChange={this.setValue}
                    />
                    <input
                        className="button"
                        type="submit"
                        value="确定"
                        onClick={this.clickSubmit}
                    />
                </div>

            )
        }else{
            return(
                // 显示字段信息
                <div id="nameSet" className="fieldSets">
                    {
                        !this.state["name"] ?
                            <p className="pName default" onClick={this.changeButton}>{this.state['default']}</p> :
                            <p className="pName" onClick={this.changeButton}>{this.state["name"]}</p>
                    }
                </div>
            )
        }
    }
}


export default InputName