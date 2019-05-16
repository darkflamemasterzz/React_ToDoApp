import React from 'react';
import './SignUp.css';

class SignUp extends React.Component{
    constructor(){
        super();
        this.state={
            "userName":null,
            "userNameIsAlright":false,
            "tel":null,
            "telIsAlright":false,
            "identifyCode":null,
            "identifyCodeIsAlright":false,
            "password":null,  // 如何让它只接受数字
            "passwordIsAlright":false,
            "isAgree": !"checked",
            "isEverthingAlright":false,
            "userNameStyle":{},
            "telStyle":{},
            "identifyCodeStyle":{},
            "identifyCodeButtonStyle":{},
            "passwordStyle":{},
        }
        this.textInfoHandle = this.textInfoHandle.bind(this)
        this.checkBoxHandle = this.checkBoxHandle.bind(this)
        this.focusHandle = this.focusHandle.bind(this)
        this.blurHandle = this.blurHandle.bind(this)
    }

    focusHandle(e){
        const style = e.target.name+"Style"
        this.setState({
            [style]: {border: "3px lightgray solid"},
        })
    }
    blurHandle(e){
        const name = e.target.name
        const style = e.target.name+"Style"
        const isAlright = e.target.name + "IsAlright"
        // tel是特别的，因为它影响发送验证码button的样式
        if (name === "tel"){
            console.log(e.target.value)
            console.log(e.target.value.length)
            console.log(isAlright+" "+this.state[isAlright])
             e.target.value.length === 11?
                this.setState({
                    [isAlright]: true,
                    [style]: {},
                    "identifyCodeButtonStyle":{
                        backgroundColor:"gray",
                        border:"1px solid gray",
                        cursor:"pointer",
                    },
                }):
                this.setState({
                    [isAlright]: false,
                    [style]: {border: "3px red solid"},
                })
            console.log(this.state["identifyCodeButtonStyle"])
            return 0
        }
        ! this.state[name] ?
            this.setState({
                [isAlright]: true,
                [style]: {border: "3px red solid"},
            }):
            this.setState({
                [isAlright]: false,
                [style]: {},
            })
    }
    textInfoHandle(e){
        const target = e.target
        const name = target.name
        this.setState({
            [name]: target.value,
        })
    }
    checkBoxHandle(e){
        const target = e.target
        const name = target.name
        this.setState({
            [name]: !this.state["isAgree"],
        })
    }

    render(){
        return(
            <div id="container">
                <form>
                    <div>
                    <input
                        style={this.state["userNameStyle"]}
                        className="inputBox"
                        name="userName"
                        type="text"
                        value={this.state["userName"]}
                        onChange={this.textInfoHandle}
                        placeholder="昵称"
                        onFocus={this.focusHandle}
                        onBlur={this.blurHandle}
                    />
                    </div>

                    <div>
                    <input
                        style={this.state["telStyle"]}
                        className="inputBox"
                        name="tel"
                        type="text"
                        value={this.state["tel"]}
                        onChange={this.textInfoHandle}
                        placeholder="手机号码"
                        onFocus={this.focusHandle}
                        onBlur={this.blurHandle}
                    />
                    </div>

                    <div>
                    <input
                        style={this.state["identifyCodeStyle"]}
                        id="identifyCodeBox"
                        className="inputBox"
                        name="identifyCode"
                        type="text"
                        value={this.state["identifyCode"]}
                        onChange={this.textInfoHandle}
                        placeholder="短信验证码"
                        onFocus={this.focusHandle}
                        onBlur={this.blurHandle}
                    />
                    <input
                        id="identifyCodeButton"
                        name="identifyCodeButtonStyle"
                        style={this.state["identifyCodeButtonStyle"]}
                        className="button"
                        type="submit"
                        value="发送验证码"
                    />
                    </div>

                    <div>
                    <input
                        style={this.state["passwordStyle"]}
                        className="inputBox"
                        name="password"
                        type="text"
                        value={this.state["password"]}
                        onChange={this.textInfoHandle}
                        placeholder="密码"
                        onFocus={this.focusHandle}
                        onBlur={this.blurHandle}
                    />
                    </div>

                    <div>
                    <input
                        className="checkBox"
                        name="isAgree"
                        type="checkbox"
                        checked={this.state["isAgree"]}
                        onChange={this.checkBoxHandle}

                    />
                    <label>
                        同意<a>Gamer's Talk使用协议</a>
                    </label>
                    </div>

                    <div>
                    <input
                        id="finish"
                        className="button"
                        type="submit"
                        value="注册"
                    />
                    </div>
                </form>
            </div>
        )
    }

}

export default SignUp