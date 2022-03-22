import axios from 'axios';

// ACTION TYPE

const SHOW_ALL_SHOPPING_LISTS = 'SHOW_ALL_SHOPPING_LISTS';

// ACTION CREATORS

export const showAllShoppingLists = (shoppingList) => ({
  type: SHOW_ALL_SHOPPING_LISTS,
  shoppingList,
});

// THUNKS

export const fetchAllShoppingLists = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/shoppinglist?userId=${id}`);
      dispatch(showAllShoppingLists(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL_SHOPPING_LISTS:
      return action.shoppingList
    default:
      return state;
  }
};

export default shoppingListReducer;
