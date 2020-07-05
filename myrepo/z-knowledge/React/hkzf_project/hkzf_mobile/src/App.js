import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import CityList from './pages/CityList'
import Home from './pages/Home'




function App () {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/home">首页</Link>
        <Link to="/citylist">城市</Link> */}

        <Route path={'/'} exact render={() => <Redirect to="/home"></Redirect>}></Route>
        <Route path={'/home'} component={Home}></Route>
        <Route path={'/citylist'} component={CityList}></Route>
      </div>
    </Router>
  );
}

export default App;
