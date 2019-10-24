import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'

import { getToken } from 'Utils/token'
import Login from 'App/views/Login/index'
import Days from 'App/views/Days/index'
import Times from 'App/views/Times/index'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return getToken() ? (
        <Component {...props} />
      ) : (
          <Login />
        )
    }}
  />
)

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Days} />
          <PrivateRoute path="/times/edit/:id?" component={Times} />
          <PrivateRoute path="/times/new/:date" component={Times} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router
