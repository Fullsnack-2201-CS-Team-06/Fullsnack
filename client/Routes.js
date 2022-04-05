import React, { Component, Fragment, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import Account from './components/Account';
import ShoppingList from './components/ShoppingList';
import ShoppingListHistoryAll from './components/ShoppingListHistoryAll';
import ShoppingListHistorySingle from './components/ShoppingListHistorySingle';
import Food from './components/Food';
import PantrySingle from './components/PantrySingle';
import Recipes from './components/Recipes';
import SingleRecipe from './components/SingleRecipe';
import EditRecipe from './components/EditRecipe';
import AddRecipe from './components/AddRecipe';
import NewPantryItem from './components/NewPantryItem';
import HomeGuest from './components/HomeGuest';
import PantryRefactor from './components/PantryRefactor';

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
          <Route
            exact
            path="/list/history"
            component={ShoppingListHistoryAll}
          />
          <Route
            exact
            path="/list/:listId"
            component={ShoppingListHistorySingle}
          />
          <Route exact path="/pantries" component={PantryRefactor} />
          <Route exact path="/pantries/add" component={NewPantryItem} />
          <Route exact path="/pantries/:id" component={PantrySingle} />
          <Route path="/foods" component={Food} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipes/add" component={AddRecipe} />
          <Route exact path="/recipes/:id" component={SingleRecipe} />
          <Route
            exact
            path="/recipes/recommended/:id"
            component={SingleRecipe}
          />
          <Route exact path="/recipes/:id/edit" component={EditRecipe} />
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact>
            {HomeGuest}
          </Route>
          <Route path="/login">{Login}</Route>
          <Route path="/signup">{Signup}</Route>
        </Switch>
      )}
    </div>
  );
};

export default Routes;
