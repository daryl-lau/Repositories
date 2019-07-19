import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import store from './store/index'


// 4、Provider
ReactDOM.render(
    <Provider store={store}>

        {/*传递了与状态机里相同的属性名，应该避免*/}
        <App name={'appname'} gender={'male'} age={2222}/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
