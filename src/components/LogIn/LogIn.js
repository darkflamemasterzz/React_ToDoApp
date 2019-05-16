import React from 'react';
import './LogIn.css';

class LogIn extends React.Component{
    constructor(){
        super()
        this.state={
            userName:"",
            password:"",
            remember: !"checked",
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        const target = event.target
        target.type==="checkbox" ?
            this.setState({
                [target.name]: !this.state.remember,   // 为什么要加[]?S
            }) :
            this.setState({
                [target.name]: target.value,
            })

    }
    render(){
        return(
            <div className="LogIn">
                <form>
                    <input
                        className="textInput"
                        name="userName"
                        type="text"
                        placeholder="电话/邮箱/用户名"
                        value={this.state.userName}
                        onChange={this.handleChange}
                    />
                    <br/>
                    <input
                        className="textInput"
                        name="password"
                        type="text"
                        placeholder="密码"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <br/>
                    <input
                        className="remember"
                        name="remember"
                        type="checkbox"
                        checked={this.state.remember}
                        onChange={this.handleChange}
                    /><span>记住我</span><a className="findPassword" href="###">找回密码</a>

                    <input
                        className="button"
                        name="button"
                        type="submit"
                        value="登录"
                    />
                </form>
                <p className="signUp"><a href="###">注册账号</a></p>
            </div>
        )
    }
}

export default LogIn