import React from 'react'
// import ReactDOM from "react-dom"
import './profiles.css'
import Paper from './proFilesComponents/paper2.js'

class Profiles extends React.Component{
    constructor(){
        super()
        this.state={
            /*profilesHeight: 0,*/
        }
        this.clickPhotoBox = this.clickPhotoBox.bind(this)
        /*this.changeProfilesHeight = this.changeProfilesHeight.bind(this)*/
    }
    clickPhotoBox(){
        console.log("click!")
        document.getElementById("inputImg").click()
    }
    /*changeProfilesHeight(height){
        this.setState({
            profilesHeight:String(parseInt(height)+267)+"px",
        })
    }*/
    render(){
        return(
            <div className="profiles" style={{height:"1267px"}}>
                <div className="bgImg"></div>
                {/*<input type="file" id="inputImg"/>*/}
                <div className="photoBorder">
                    <div className="photo" onClick={this.clickPhotoBox}></div>
                </div>
                <Paper changeProfilesHeight={this.changeProfilesHeight} />
            </div>
        )
    }
}

export default Profiles