import React from 'react'

class InputModule extends React.Component{
    constructor(props){
        super(props)
        this.state={
            "name":null,
            "gender": null,
            "briefIntroduction": null,
            "address": null,
            "Industry": null,
            "corporation": null,
            "position": null,
            "school": null,
            "major": null,
            "educationState": null,
            'default': this.props.defaultText,
            ifChanging: false,
        }
    }
    changeButton(){
        this.setState({
            ifChanging: true,
        })
    }

    setValue(e){
        const target = e.target
        this.setState({
            [target.name]: target.value
        })
        console.log(this.state.ifChanging)
    }
    clickSubmit(){
        this.setState({
            ifChanging: false,
        })
    }


}

export default InputModule