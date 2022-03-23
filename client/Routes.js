import React, { Component, Fragment, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import Account from './components/Account';
import ShoppingList from './components/ShoppingList';
import ShoppingListHistory from './components/ShoppingListHistory'
import Pantries from './components/Pantries';
import Food from './components/Food';
import PantrySingle from './components/PantrySingle';
import Recipes from './components/Recipes';
import SingleRecipe from './components/SingleRecipe';
import AddRecipe from './components/AddRecipe';

/**
 * COMPONENT
 */

const Routes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/account" component={Account} />
          <Route exact path="/list" component={ShoppingList} />
          <Route exact path="/list/history" component={ShoppingListHistory} />
          <Route exact path="/pantries" component={Pantries} />
          <Route path="/pantries/:id" component={PantrySingle} />
          <Route path="/foods" component={Food} />
          <Route exact path="/recipes" component={Recipes} />
          <Route path="/recipes/add" component={AddRecipe} />
          <Route path="/recipes/:id" component={SingleRecipe} />
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact>
            {Login}
          </Route>
          <Route path="/login">{Login}</Route>
          <Route path="/signup">{Signup}</Route>
        </Switch>
      )}
    </div>
  );
};

export default Routes;
