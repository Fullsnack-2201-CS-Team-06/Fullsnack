import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import pantryReducer from './pantry'
import pantriesReducer from './pantries';
import recipesReducer from './recipes';
import singleRecipeReducer from './singleRecipe';
import shoppingListReducer from './ShoppingList'
import foodsReducer from './foods';

const reducer = combineReducers({
  auth: auth,
  pantry: pantryReducer,
  shoppingList: shoppingListReducer,
  pantries: pantriesReducer,
  recipes: recipesReducer,
  singleRecipe: singleRecipeReducer,
  foods: foodsReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
