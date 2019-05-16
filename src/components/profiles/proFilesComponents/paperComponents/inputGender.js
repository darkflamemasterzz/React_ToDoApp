import React from 'react'
import InputModule from './inputModule'

class InputGender extends InputModule{
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
                <div>
                    <div className="GenderDiv" onChange={this.setValue}>
                        <input className="GenderInput" type="radio" name="gender" value="male"/>
                        <label>male</label>
                        <input className="GenderInput" type="radio" name="gender" value="female"/>
                        <label>female</label>
                        <input
                            className="button"
                            type="submit"
                            value="确定"
                            onClick={this.clickSubmit}
                        />
                    </div>
                </div>

            )
        }else{
            return(
                // 显示字段信息
                <div className="fieldSets">
                    <span className="pTitle">性别</span>
                    {
                        !this.state["gender"] ?
                            <p className="pGender default" onClick={this.changeButton}>{this.state['default']}</p> :
                            <p className="pGender" onClick={this.changeButton}>{this.state["gender"]}</p>
                    }
                </div>
            )
        }
    }
}


export default InputGender