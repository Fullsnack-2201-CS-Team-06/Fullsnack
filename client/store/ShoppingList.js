import axios from 'axios';

// ACTION TYPE

const SHOPPING_HISTORY = 'SHOPPING_HISTORY';
const ADD_TO_SHOPPING_LIST = 'ADD_TO_SHOPPING_LIST'
const CURRENT_SHOPPING_LIST = 'CURRENT_SHOPPING_LIST'
const EDIT_LIST = 'EDIT_LIST'
const TO_PANTRY = 'TO_PANTRY'

// ACTION CREATORS

export const showShoppingListHistory = (shoppingHistory) => ({
  type: SHOPPING_HISTORY,
  shoppingHistory,
});

export const showCurrentList = (currentList) => ({
  type: CURRENT_SHOPPING_LIST, currentList
})
export const editList = (currentList) => ({
  type: EDIT_LIST,
  currentList
})

export const AddToList = (item) => ({
  type: ADD_TO_SHOPPING_LIST,
  item
})

export const toPantry = (newList) => ({
  type: TO_PANTRY,
  newList
})

// THUNKS

export const fetchShoppingListHistory = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/shoppinglist/all?userId=${id}`);
      dispatch(showShoppingListHistory(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const AddItemToShoppingList = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/shoppinglist`)
      dispatch(AddToList(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchCurrentShoppingList = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/shoppinglist?userId=${id}`);
      dispatch(showCurrentList(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editListThunk = (itemId, userId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/shoppinglist?userId=${userId}`, { itemId, quantity })
      dispatch(editList(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const sendToPantry = (userId, currentList) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/shoppinglist?userId=${userId}`, { currentList })
      dispatch(toPantry(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_SHOPPING_LIST:
      return { ...state, currentList: action.currentList }
    case SHOPPING_HISTORY:
      return  { ...state, shoppingHistory: action.shoppingHistory }
    case EDIT_LIST:
      return { ...state, currentList: action.currentList }
    case TO_PANTRY:
      console.log(action)
      return { ...state, currentList: action.newList }
    default:
      return state;
  }
};

export default shoppingListReducer;
