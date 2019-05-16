import React from 'react'
import InputModule from './inputModule'

class InputAddress extends InputModule{
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
                        className="inputBox"
                        placeholder="输入你的居住地址"
                        name="address"
                        type="text"
                        value={this.state["address"]}
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
                    <span className="pTitle">居住地址</span>
                    {
                        !this.state["address"] ?
                            <p className="pAddress default" onClick={this.changeButton}>{this.state['default']}</p> :
                            <p className="pAddress" onClick={this.changeButton}>{this.state["address"]}</p>
                    }
                </div>
            )
        }
    }
}


export default InputAddress