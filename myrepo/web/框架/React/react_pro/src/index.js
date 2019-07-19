import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// redux
// npm i redux react-redux -S
// 1、引入
import {createStore} from 'redux';
import {Provider} from 'react-redux';

// 2、创建存储
function reducer1(state = {name: 'aaa', age: 18}, action) {
    switch (action.type) {
        case 'set_name':
            return {
                ...state,
                name: action.name
            };
        case 'add_age':
            return {
                ...state,
                age: state.age + action.n
            };
        default:
            return state
    }
}

// 3、创建存储对象
const store = createStore(reducer1);


// 4、Provider
ReactDOM.render(
    <Provider store={store}>

        {/*传递了与状态机里相同的属性名，应该避免*/}
        <App name={'bbb'} gender={'male'}/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
