import React from 'react'
import InputModule from './inputModule'

class InputEducation extends InputModule{
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
                    <input placeholder="输入你的学校" className="inputEdu inputBox" type="text" name="school" value={this.state["school"]} onChange={this.setValue} />
                    <input placeholder="输入你的专业" className="inputEdu inputBox" type="text" name="major" value={this.state["major"]} onChange={this.setValue} />
                    <input placeholder="输入你的学历" className="inputEdu inputBox" type="text" name="educationState" value={this.state["educationState"]} onChange={this.setValue} />
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
                    <span className="pTitle">教育背景</span>
                    {
                        !this.state["school"] || !(this.state["major"] || !this.state["educationState"]) ?
                            <p className="pEdu default" onClick={this.changeButton}>{this.state['default']}</p> :
                            <p className="pEdu" onClick={this.changeButton}>
                                <span>{this.state["school"]}</span>
                                <span>-</span>
                                <span>{this.state["major"]}</span>
                                <span>-</span>
                                <span>{this.state["educationState"]}</span>
                            </p>
                    }
                </div>
            )
        }
    }
}


export default InputEducation