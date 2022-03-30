import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import styles from './Navbar.module.css';
import { Navbar as Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

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
            <Container className={styles.signedInLinks}>
              {/* The navbar will show these links after you log in */}
              {/* <Link to="/home">Home</Link> */}
              <Link to="/list" className={styles.navBarLink}>
                Shopping List
              </Link>
              <Link to="/pantries" className={styles.navBarLink}>
                Pantry
              </Link>
              <Link to="/recipes" className={styles.navBarLink}>
                Recipes
              </Link>
              <Link to="/foods" className={styles.navBarLink}>
                Foods
              </Link>
              <NavDropdown
                title={<FaUserCircle size={25} />}
                id={styles.navdropdown}
              >
                <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={() => dispatch(logout())}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Container>
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
