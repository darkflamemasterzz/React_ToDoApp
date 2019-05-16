import React from 'react';

function Form_AddList(props) {
    return (
        <div>
            <form className="Form_AddToDoLists">
                <input 
                    placeholder="待办事项列表标题"
                    type="text"                    
                 />
                 <input 
                    type="submit"
                    value="确定"
                 />
            </form>
        </div>
    );
};

export default Form_AddList;