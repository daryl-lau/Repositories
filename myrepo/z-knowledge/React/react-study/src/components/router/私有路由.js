import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuth } from '../../utils'

// usage:  <PrivateRoute path={'/xxx'} component={Com} />

// props:  {path: '/xxx', component: Com}
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const isLogin = isAuth()
        if (isLogin) {
          return <Component {...props} />
        } else {
          // state属性在跳转后的页面中可以使用this.props.location.state拿到
          return <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
        }
      }}
    />
  )
}

export default PrivateRoute