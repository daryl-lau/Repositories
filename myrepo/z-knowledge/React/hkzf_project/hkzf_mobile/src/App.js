import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import CityList from './pages/CityList'
import Home from './pages/Home'
import Map from './pages/Map'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'
import Favorate from './pages/Favorate'
import Registe from './pages/Registe'
import Rent from './pages/Rent'
import RentAdd from './pages/Rent/Add'
import RentSearch from './pages/Rent/Search'



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
        <Route path={'/registe'} component={Registe}></Route>
        <PrivateRoute path={'/favorate'} component={Favorate}></PrivateRoute>
        <PrivateRoute path={'/rent'} component={Rent} exact></PrivateRoute>
        <PrivateRoute path={'/rent/add'} component={RentAdd}></PrivateRoute>
        <PrivateRoute path={'/rent/search'} component={RentSearch}></PrivateRoute>
      </div>
    </Router>
  );
}

export default App;
