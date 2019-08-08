import React from 'react';
import ReactDom from 'react-dom'

import {Provider} from 'react-redux'


import {BrowserRouter} from "react-router-dom";

import App from './App'

import store from './store'

ReactDom.render(
    <BrowserRouter>
        <Provider store={store}><App/></Provider>
    </BrowserRouter>
    , document.getElementById('root'));