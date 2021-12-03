import React, {Component, Fragment, useEffect } from 'react'
import {connect, useSelector, useDispatch } from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'

/**
 * COMPONENT
 */
  
const Routes = () => {
  const isLoggedIn = useSelector(state => !!state.auth.id)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(me())
  }, [])

 return (
   <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact >{Login}</Route>
            <Route path="/login">{Login}</Route>
            <Route path="/signup">{Signup}</Route>
          </Switch>
        )}
      </div>
  )

}

export default Routes