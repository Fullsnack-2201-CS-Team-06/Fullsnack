import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../store';
import styles from './AuthForm.module.css';
import { Form, Button } from 'react-bootstrap';

/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate(username, password, formName));
  };

  return (
    <div className={styles.authFormContainer}>
      <Form className={styles.authForm} onSubmit={handleSubmit} name={name}>
        <div>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Enter username"
          />
        </div>
        <div>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <div>
          <Button variant="primary" className={styles.button} type="submit">
            {displayName}
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
    </div>
  );
};

export const Login = <AuthForm name="login" displayName="Login" />;
export const Signup = <AuthForm name="signup" displayName="Sign Up" />;
