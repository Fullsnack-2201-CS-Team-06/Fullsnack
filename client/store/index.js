import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
// import pantryReducer from './pantry'
import pantriesReducer from './pantries';
import recipesReducer from './recipes';
import singleRecipeReducer from './singleRecipe';

const reducer = combineReducers({
  auth: auth,
  //  pantry: pantryReducer,
  pantries: pantriesReducer,
  recipes: recipesReducer,
  singleRecipe: singleRecipeReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
