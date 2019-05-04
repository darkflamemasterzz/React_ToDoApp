import React from 'react'

class NameInput extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.name,
        }
        this.changeHandle=this.changeHandle.bind(this)
        this.ClickSubmit=this.ClickSubmit.bind(this)
    }
    changeHandle(e){
        const target = e.target
        this.setState({
            name: target.value,
        })
    }
    ClickSubmit(){
        console.log(this.state.name)
        this.props.changeName(this.state.name, false)
    }
    render(){
        return(
            <div>
                <input
                    type="text"
                    onChange={this.changeHandle}
                    value={this.state.name}
                />
                <button onClick={this.ClickSubmit}>submit</button>
            </div>
        )
    }
}


export default NameInput