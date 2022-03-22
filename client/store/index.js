import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
// import pantryReducer from './pantry'
import pantriesReducer from './pantries'
import shoppingListReducer from './ShoppingList'

const reducer = combineReducers({ auth: auth,
//  pantry: pantryReducer,
  shoppingList: shoppingListReducer,
  pantries: pantriesReducer})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
