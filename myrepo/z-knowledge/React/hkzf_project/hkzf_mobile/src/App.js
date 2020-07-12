import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import CityList from './pages/CityList'
import Home from './pages/Home'
import Map from './pages/Map'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'




function App () {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/home">首页</Link>
        <Link to="/citylist">城市</Link> */}

        <Route path={'/'} exact render={() => <Redirect to="/home"></Redirect>}></Route>
        <Route path={'/home'} component={Home}></Route>
        <Route path={'/citylist'} component={CityList}></Route>
        <Route path={'/map'} component={Map}></Route>
        <Route path={'/detail/:id'} component={HouseDetail}></Route>
        <Route path={'/login'} component={Login}></Route>
      </div>
    </Router>
  );
}

export default App;
