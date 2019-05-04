import React from 'react';
import './Bookmark.css'

function Bookmark(props){
    return(
        <div id="Container">
            <div className="bookMarkContainer" id="red" 
                onMouseEnter={props.moveBookmark}
                onMouseLeave={props.moveBackBookmark}
                onClick={props.StartTimeHandle}
            >
                <div className="red bookmark">按创建时间排序</div>
                <div className="red triangle"/>
            </div>

            <div className="bookMarkContainer" id="green" 
                onMouseEnter={props.moveBookmark}
                onMouseLeave={props.moveBackBookmark}
                onClick={props.GradeLevelHandle}
            >
                <div className="green bookmark">按重要程度排序</div>
                <div className="green triangle"/>
            </div>

            <div className="bookMarkContainer" id="blue" 
                onMouseEnter={props.moveBookmark}
                onMouseLeave={props.moveBackBookmark}
                onClick={props.DurationHandle}
            >
                <div className="blue bookmark">按固定时长排序</div>
                <div className="blue triangle"/>
            </div>
        </div>
    )
}

export default Bookmark;