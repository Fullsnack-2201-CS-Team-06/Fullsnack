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
    <div className={styles.authPageContainer}>
      <div className={styles.authFormContainer}>
        <Form className={styles.authForm} onSubmit={handleSubmit} name={name}>
          <h1 className={styles.formTitle}>Login</h1>
          <Form.Group>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter Password"
            />
          </Form.Group>
          <Button variant="danger" className={styles.button} type="submit">
            {displayName}
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
      </div>
      <div className={styles.authPageImg}>
        <img src="https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&poi=face&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2007%2F09%2F17%2FMR_Reshoots_102219_016-2000.jpg" />
      </div>
    </div>
  );
};

export const Login = <AuthForm name="login" displayName="Login" />;
export const Signup = <AuthForm name="signup" displayName="Sign Up" />;
