import React from 'react'
import './mainLines.css'

class MainLine extends React.Component{
    constructor(props){
        super(props)
        this.state={
            [this.props.name + "Class"]:"mainLines",  // 为什么要加[]
            "changeGender":false,
            "Gender":" Unknow",
            "changeBriefIntroduction":false,
            "briefIntroduction": "There should be a brief introduction",
            "changeAddress":false,
            "address": "Add address info right here",
            "changeIndustry":false,
            "industry": "Add industry info right here",
            "changeBussiness":false,
            "bussiness": "Add bussiness info right here",
            "corporation":null,
            "position":null,
            "changeEducation":false,
            "education": "Add education info right here",
            "school":null,
            "major":null,
            "educationState":null,
            "hasEducationInfo":false,
        }
        this.changeHandle = this.changeHandle.bind(this)
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)
    }

    changeHandle(e){
        const className = e.target.className
        const classNames = className.split(" ")
        const target = e.target
        console.log(target.name)
        console.log(className)
        console.log(classNames)
        console.log(2 in classNames)
        if(2 in classNames){             // 很危险
            // 取出第一个class: "change_"
            const change_ = classNames[0]
            console.log(change_)
            console.log("toChange!")
            this.setState({
                [String(change_)]:true,  //为啥要加[]?
            })
            console.log(this.state["changeGender"])
        }else if(target.name === "corporation" || target.name === "position"){
            this.setState({
                [target.name]: target.value,
            })
            console.log(this.state["corporation"])
            console.log(this.state["position"])
        }else if(target.name === "bussiness"){
            this.setState({
                "bussiness": "所在公司："+this.state["corporation"] + "所在职位："+this.state["position"],
                [this.props.handleName]: false,
            })
            console.log("setBussiness")
        }else if(target.name === "education"){
            // 学校、专业、学历 三个字段的信息都不为空才显示教育背景信息
            if(this.state["school"] && this.state["major"] && this.state["educationState"]){
                this.setState({
                    "hasEducationInfo":true,
                    [this.props.handleName]: false,
                })
            }
        }else if(className === "submitChange"){
            console.log(this.props.name)
            // 输入的表单信息不许为空
            if (this.state[this.props.name] === ""){
                alert("输入的表单信息不许为空！")

            }else{
                this.setState({
                    [this.props.handleName]: false,
                })
                console.log("submitChange!")
            }
        }else{
            this.setState({
                [target.name]:target.value,
            })
        }
        e.preventDefault()
    }
    handleMouseOver(){
        this.setState({
            [this.props.name + "Class"]: "mainLines lineHover",
        })
    }
    handleMouseOut(){
        this.setState({
            [this.props.name + "Class"]:"mainLines",
        })
    }
    render() {
        //GenderChanging
        if (this.props.name === "Gender") {
            return (
                <div>
                    <p className={this.state[this.props.name+"Class"]} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseOut} style={{marginTop: parseInt(this.props.margin)}}>
                        {
                            this.state[this.props.handleName] === false ?
                                <span>
                                <span className="title">{this.props.title}</span>
                                <span className={this.props.handleName + " context toChange"} onClick={this.changeHandle}>{this.state[this.props.name]}</span>
                                {/*<input className="toChange" name={this.props.handleName} type="submit"
                                       value="changeHandle" onClick={this.changeHandle}/>*/}
                            </span> :
                                <div>
                                    <div className="Gender" onChange={this.changeHandle}>
                                        <input type="radio" name="Gender" value="male"/>
                                        <label>male</label>
                                        <input type="radio" name="Gender" value="female"/>
                                        <label>female</label>
                                        <input className="submitChange" type="submit" value="确定" name={this.props.name}
                                               onClick={this.changeHandle}/>
                                    </div>
                                    {/*<div className="buttonGround">
                                        <input className="submitChange" type="submit" value="确定" name={this.props.name}
                                               onClick={this.changeHandle}/>
                                    </div>*/}
                                </div>
                        }
                    </p>
                </div>
            )
        }



        //industry
        if (this.props.name === "industry") {
            return (
                <div>
                    <p className={this.state[this.props.name+"Class"]} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseOut} >
                        {
                            this.state[this.props.handleName] === false ?
                                <span>
                                <span className="title">{this.props.title}</span>
                                <span className={this.props.handleName + " context toChange"} onClick={this.changeHandle}>{this.state[this.props.name]}</span>
                                {/*<input className="toChange" name={this.props.handleName} type="submit"
                                       value="changeHandle" onClick={this.changeHandle}/>*/}
                            </span> :
                                <div className="industrySelection">
                                    <select name={this.props.name} value={this.state["industry"]} onChange={this.changeHandle}>
                                        <option value="Add industry info right here">Add industry info right here</option>
                                        <option value="高新科技">高新科技</option>
                                        <option value="互联网">互联网</option>
                                        <option value="电子商务">电子商务</option>
                                    </select>
                                        <input className="submitChange" type="submit" value="确定" name={this.props.name}
                                               onClick={this.changeHandle}/>
                                </div>
                        }
                    </p>
                </div>
            )
        }




        //briefIntroChanging  ||  addressChanging
        if (this.props.name === "briefIntroduction" || this.props.name === "address") {
            return (
                <div>
                    <p className={this.state[this.props.name+"Class"]} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseOut} >
                        {
                            this.state[this.props.handleName] === false ?
                                <span>
                                <span className="title">{this.props.title}</span>
                                <span className={this.props.handleName + " context toChange"} onClick={this.changeHandle}>{this.state[this.props.name]}</span>
                                {/*<input className="toChange" name={this.props.handleName} type="submit"
                                       value="changeHandle" onClick={this.changeHandle}/>*/}
                            </span> :
                                <div className="BandA">
                                    <input className="textInput" type="text" name={this.props.name} value={this.state[this.props.name]} onChange={this.changeHandle} />
                                    <input className="submitChange" type="submit" value="确定" name={this.props.name}
                                           onClick={this.changeHandle}/>
                                </div>
                        }
                    </p>
                </div>
            )
        }




        //bussinessChanging
        if (this.props.name === "bussiness") {
            return (
                <div>
                    <p className={this.state[this.props.name+"Class"]} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseOut} >
                        {
                            this.state[this.props.handleName] === false ?
                                <span>
                                <span className="title">{this.props.title}</span>
                                <span className={this.props.handleName + " context toChange"} onClick={this.changeHandle}>{this.state[this.props.name]}</span>
                                {/*<input className="toChange" name={this.props.handleName} type="submit"
                                       value="changeHandle" onClick={this.changeHandle}/>*/}
                            </span> :
                                <div className="bussiness">
                                    <input className="textInput" type="text" name="corporation" value={this.state["corporation"]} onChange={this.changeHandle} />
                                    <input className="textInput" type="text" name="position" value={this.state["position"]} onChange={this.changeHandle} />
                                    <input className="submitChange" type="submit" value="确定" name={this.props.name}
                                           onClick={this.changeHandle}
                                    />
                                </div>
                        }
                    </p>
                </div>
            )
        }




        //educationChanging
        if (this.props.name === "education") {
            return (
                <div>
                    <p className={this.state[this.props.name+"Class"]} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseOut} >
                        {
                            this.state[this.props.handleName] === false ?
                                <span>
                                <span className="title">{this.props.title}</span>
                                {/*<span className="context">{this.state[this.props.name]}</span>*/}
                                <span className={this.props.handleName + " context toChange"} onClick={this.changeHandle}>
                                        {
                                            this.state["hasEducationInfo"] ?
                                                this.state["school"] + " "+"."+" " + this.state["major"] + " "+"."+" " + this.state["educationState"]:
                                                this.state[this.props.name]

                                        }
                                </span>
                                {/*<input className="toChange" name={this.props.handleName} type="submit"
                                       value="changeHandle" onClick={this.changeHandle}/>*/}
                            </span> :
                                <div className="education">
                                    <input className="textInput" type="text" name="school" value={this.state["school"]} onChange={this.changeHandle} />
                                    <input className="textInput" type="text" name="major" value={this.state["major"]} onChange={this.changeHandle} />
                                    <input className="textInput" type="text" name="educationState" value={this.state["educationState"]} onChange={this.changeHandle} />
                                    <input className="textInput" className="submitChange" type="submit" value="确定" name={this.props.name}
                                           onClick={this.changeHandle}/>
                                </div>
                        }
                    </p>
                </div>
            )
        }


    }

}



export default MainLine