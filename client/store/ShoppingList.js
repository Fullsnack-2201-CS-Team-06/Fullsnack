import axios from 'axios';

// ACTION TYPE

const SHOPPING_HISTORY = 'SHOPPING_HISTORY';
const CURRENT_SHOPPING_LIST = 'CURRENT_SHOPPING_LIST'
const EDIT_LIST = 'EDIT_LIST'

// ACTION CREATORS

export const showAllShoppingLists = (shoppingHistory) => ({
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

export const editListThunk = (item, id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/shoppinglist?userId=${id}`, item)
      dispatch(editList(data))
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
    default:
      return state;
  }
};

export default shoppingListReducer;
