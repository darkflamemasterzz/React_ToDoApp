
import React from 'react'; // recat在哪？ 怎么找到它的？
import ReactDOM from 'react-dom';
// import LogIn from './components/LogIn/LogIn';
// import Profiles from './components/profiles/profiles';
// import SignUp from './components/SignUp/SignUp';
// import ToDoList2 from './components/todolist/ToDoList2';
import Root from './components/todolist/root';
/*import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';*/

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
/*serviceWorker.unregister();*/
