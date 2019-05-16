import React from 'react'
import './paper2.css'
/*import InputModule from './paperComponents/inputModule'*/
import InputGender from './paperComponents/inputGender'
import InputBI from './paperComponents/inputBI'
import InputAddress from './paperComponents/inputAddress'
import InputIndustry from './paperComponents/inputIndustry'
import InputJob from './paperComponents/inputJob'
import InputEducation from './paperComponents/inputEducation'
import InputName from './paperComponents/inputName'

class Paper extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }

    }



    render(){
        return(
            <div id="paper">
                <div className="mainContent">
                    <input type="file" id="inputImg"/>
                    <InputName
                        defaultText="What your name ?"
                    />
                    <InputGender
                        defaultText="male or female?"
                    />
                    <InputBI
                        defaultText="Introduce yourself right here"
                    />
                    <InputAddress
                        defaultText="Where you live in ?"
                    />
                    <InputIndustry
                        defaultText="Add industry info right here"
                    />
                    <InputJob
                        defaultText="Add job info right here"
                    />
                    <InputEducation
                        defaultText="Add education info right here"
                    />
                </div>
            </div>
    )}
}

export default Paper