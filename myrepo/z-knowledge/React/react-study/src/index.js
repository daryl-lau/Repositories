import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import './components/redux/redux_test'
// import store from './components/redux/index'
// import sagaStore from './components/redux/saga'
// import mobxStore from './components/mobx'

// import { Provider } from 'react-redux'
import { Provider } from 'mobx-react'

import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={sagaStore}> */}
    {/* <Provider {...mobxStore}> */}
      {/* <Router> */}
        <App />
      {/* </Router> */}
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
