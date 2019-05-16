import React from 'react'
import InputModule from './inputModule'

class InputIndustry extends InputModule{
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
                <div id="industryInput" className="inputs">
                    <select className="inputBox" name="Industry" value={this.state["Industry"]} onChange={this.setValue}>
                        <option value="Add industry info right here">Add industry info right here</option>
                        <option value="高新科技">高新科技</option>
                        <option value="互联网">互联网</option>
                        <option value="电子商务">电子商务</option>
                    </select>
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
                    <span className="pTitle">从事行业</span>
                    {
                        !this.state["Industry"] ?
                            <p className="pIndustry default" onClick={this.changeButton}>{this.state['default']}</p> :
                            <p className="pIndustry" onClick={this.changeButton}>{this.state["Industry"]}</p>
                    }
                </div>
            )
        }
    }
}


export default InputIndustry