import React from 'react'
import './paper.css'
import MainLine from './paperComponents/mainLines'

class Paper extends React.Component{
    constructor(props){
        super(props)
        this.state={
            "nameEditClass": "nameEdit",
            "nameEdit nameHover": false,
            "name" : "Edit your name",

        }
        /*setTimeout(() => this.setState({ ifUpdate: true }), 0)  // 这个异步陷阱实际上我还不太懂
        this.paperHeight = React.createRef()*/
        this.changeName = this.changeName.bind(this)
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)
        /*this.changeGender = this.changeGender.bind(this)*/
    }
    changeName(e){
        console.log("click!");
        const target = e.target
        const key = target.getAttribute('class')
        console.log(key)
        console.log(this.state[key])
        if (key === "inputName"){
            this.setState({
                "name": target.value,
            })
            return true
        }
        if (key === "changeNameSubmit"){
            this.setState({
                "nameEdit nameHover":false,
            })
            return true
        }
        this.setState({
            [key]: !this.state[key]
        })
    }
    handleMouseOver(){
        this.setState({
            "nameEditClass": "nameEdit nameHover",
        })
    }
    handleMouseOut(){
        this.setState({
            "nameEditClass": "nameEdit",
        })
    }
    /*changeGender(e){
        this.setState({
            genderEdit:true,
            /!*ifUpdate: !this.state.ifUpdate,*!/
        })
        e.preventDefault()
    }*/
    /*componentDidUpdate(){
        const paperHeight = document.defaultView.getComputedStyle(this.paperHeight.current,null).height
        this.props.changeProfilesHeight(paperHeight)
    }
    shouldComponentUpdate(nextProps,nextState){   // 官方不推荐使用 很容易会出bug
        if(nextState.ifUpdate === this.state.ifUpdate){
            return false
        }
        return true
    }*/

    render(){
        /*const { ifUpdate } = this.state;
        if (ifUpdate === false) {
            return false;
        }*/
        return(
            <div className="paper" ref={this.paperHeight}>
                <form className="mainContent">
                    <input type="file" id="inputImg"/>
                    {/*编辑昵称*/}
                    {this.state["nameEdit nameHover"] ?
                        <div>
                            <input
                                className="inputName"
                                type="text"
                                onChange={this.changeName}
                                value={this.state.name}
                            />
                            <button className="changeNameSubmit" onClick={this.changeName}>submit</button>
                        </div>
                        :
                        <p className={this.state["nameEditClass"]} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseOut} onClick={this.changeName}>{this.state.name}</p>
                    }
                    {/*编辑主要信息字段*/}
                    <MainLine name="Gender" handleName="changeGender" margin="100" title="性别" />
                    <MainLine name="briefIntroduction" handleName="changeBriefIntroduction" title="简介" />
                    <MainLine name="address" handleName="changeAddress" title="居住地址" />
                    <MainLine name="industry" handleName="changeIndustry" title="所在行业" />
                    <MainLine name="bussiness" handleName="changeBussiness" title="工作经历" />
                    <MainLine name="education" handleName="changeEducation" title="教育背景"  />

                </form>
            </div>
        )
    }
}

export default Paper