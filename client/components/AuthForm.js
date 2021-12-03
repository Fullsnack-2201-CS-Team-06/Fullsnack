import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const formName = evt.target.name
    const username = evt.target.username.value
    const password = evt.target.password.value
    dispatch(authenticate(username, password, formName))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

export const Login = <AuthForm name="login" displayName="Login" />
export const Signup = <AuthForm name="signup" displayName="Sign Up" />