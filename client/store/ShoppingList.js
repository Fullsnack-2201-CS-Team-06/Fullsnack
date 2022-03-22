import axios from 'axios';

// ACTION TYPE

const SHOPPING_HISTORY = 'SHOPPING_HISTORY';
const CURRENT_SHOPPING_LIST = 'CURRENT_SHOPPING_LIST'

// ACTION CREATORS

export const showAllShoppingLists = (shoppingHistory) => ({
  type: SHOPPING_HISTORY,
  shoppingHistory,
});

export const showCurrentList = (currentList) => ({
  type: CURRENT_SHOPPING_LIST, currentList
})

// THUNKS

export const fetchAllShoppingLists = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/shoppinglist/all?userId=${id}`);
      dispatch(showAllShoppingLists(data));
    } catch (error) {
      console.log(error);
    }
  };
};

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

const initialState = {};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_SHOPPING_LIST:
      return { ...state, currentList: action.currentList }
    case SHOPPING_HISTORY:
      return  { ...state, shoppingHistory: action.shoppingHistory }
    default:
      return state;
  }
};

export default shoppingListReducer;
