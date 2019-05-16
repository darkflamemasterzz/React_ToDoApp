import React from 'react'
import InputModule from './inputModule'

class InputJob extends InputModule{
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
                <div className="inputs">
                    <input placeholder="输入你的公司名称" className="inputJob inputBox" type="text" name="corporation" value={this.state["corporation"]} onChange={this.setValue} />
                    <input placeholder="输入你的职位" className="inputJob inputBox" type="text" name="position" value={this.state["position"]} onChange={this.setValue} />
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
                <div className="fieldSets">
                    <span className="pTitle">所在岗位</span>
                    {
                        !this.state["corporation"] || !this.state["position"] ?
                            <p className="pJob default" onClick={this.changeButton}>{this.state['default']}</p> :
                            <p className="pJob" onClick={this.changeButton}>
                                <span>{this.state["corporation"]}</span>
                                <span>-</span>
                                <span>{this.state["position"]}</span>
                            </p>
                    }
                </div>
            )
        }
    }
}


export default InputJob