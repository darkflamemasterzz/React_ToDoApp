import React from 'react'
import InputModule from './inputModule'

class InputBI extends InputModule{
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
                    <input
                        placeholder="简单介绍你自己"
                        className="inputBox"
                        name="briefIntroduction"
                        type="text"
                        value={this.state["briefIntroduction"]}
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
                <div className="fieldSets">
                    <span className="pTitle">自我简介</span>
                    {
                        !this.state["briefIntroduction"] ?
                            <p className="pBI default" onClick={this.changeButton}>{this.state['default']}</p> :
                            <p className="pBI" onClick={this.changeButton}>{this.state["briefIntroduction"]}</p>
                    }
                </div>
            )
        }
    }
}


export default InputBI