import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import styles from './Navbar.module.css';
import { Navbar as Nav, Container } from 'react-bootstrap';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  return (
    <Nav fixed="top" className={styles.navBar}>
      <Container>
        <Link to="/">
          <h1 className={styles.logo}>FULLSNACK</h1>
        </Link>

        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              {/* <Link to="/home">Home</Link> */}
              <Link to="/list">Shopping List</Link>
              <Link to="/pantries">Pantry</Link>
              <Link to="/foods">Foods</Link>
              <Link to="/recipes">Recipes</Link>
              <Link to="/account">Account</Link>
              <a href="#" onClick={() => dispatch(logout())}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </Container>
    </Nav>
  );
};

export default Navbar;
