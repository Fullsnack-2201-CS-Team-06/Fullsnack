import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { fetchCurrentShoppingList } from '../store/ShoppingList';
import styles from './Navbar.module.css';
import {
  Navbar as Nav,
  Container,
  NavDropdown,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();
  const [showListUpdate, setShowListUpdate] = useState(false);
  const { recipes } = useSelector((state) => state);
  const [prevRecipes, setPrevRecipes] = useState(0);
  const [newRecipes, setNewRecipes] = useState(false);
  const didMount = useRef(false);

  // let renderCount = 0;
  useEffect(() => {
    if (didMount.current) {
      //If there are more recipes than before, a recipe was added to My Recipes.
      //If so, set the state to show a popover indicating ingredients were added to the list.
      if (recipes.length > prevRecipes) {
        setNewRecipes(true);
        //Set back to false, or else we won't know if multiple additions happened consecutively.
        setTimeout(() => {
          setNewRecipes(false);
        }, 1000);
      } else {
        setNewRecipes(false);
      }
      setPrevRecipes(recipes.length);
    } else {
      didMount.current = true;
      setPrevRecipes(recipes.length);
    }
  }, [recipes.length]);

  useEffect(() => {
    //If there are new recipes in My Recipes, show the popover for 5 seconds.
    if (didMount.current && newRecipes === true) {
      setShowListUpdate(true);
      setTimeout(() => {
        setShowListUpdate(false);
      }, 5000);
    } else {
      didMount.current = true;
    }
  }, [newRecipes]);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        Some new ingredients are added to your shopping list!
      </Popover.Body>
    </Popover>
  );

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
              <Link to="/foods" className={styles.navBarLink}>
                Foods
              </Link>
              <OverlayTrigger
                overlay={popover}
                placement="bottom"
                show={showListUpdate}
              >
                <Link to="/list" className={styles.navBarLink}>
                  Shopping List
                </Link>
              </OverlayTrigger>
              <Link to="/pantries" className={styles.navBarLink}>
                Pantry
              </Link>
              <Link to="/recipes" className={styles.navBarLink}>
                Recipes
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
              <Link to="/login" className={styles.navBarLink}>
                Login
              </Link>
              <Link to="/signup" className={styles.navBarLink}>
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </Container>
    </Nav>
  );
};

export default Navbar;
