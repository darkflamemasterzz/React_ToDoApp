import React from 'react';
import './Form.css'

const Form = (props) => {
    return (
        <div>
            <form>
                <input 
                    className="mainText" 
                    name="content" 
                    type="text" 
                    onChange={props.AddContentHandle}
                    placeholder = {props.placeholder}
                />
                <p className="p_select">
                    <span>重要程度:</span>
                    <select onChange={props.GradeLevelHandle}>
                        <option value="很重要">很重要</option>
                        <option value="一般重要">一般重要</option>
                        <option value="不重要">不重要</option>
                    </select>
                </p>
                <p className="p_select">
                    <span>活动时长:</span>
                    <select onChange={props.DurationHandle}>
                        <option value="0">less than 30min</option>
                        <option value="1">30min~2h</option>
                        <option value="2">2h~4h</option>
                        <option value="3">more than 4h</option>
                    </select>
                </p>
                <p className="formButton"><input type="submit" value="确定" onClick={props.Submit}/></p>
            </form>
        </div>
    );
};

export default Form;