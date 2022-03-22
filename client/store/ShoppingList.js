import axios from 'axios';

// ACTION TYPE

const SHOW_ALL = 'SHOW_ALL';

// ACTION CREATORS

export const showAll = (allShoppingLists) => ({
  type: SHOW_ALL,
  allShoppingLists,
});

// THUNKS

export const fetchAllShoppingLists = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/`);
      dispatch(showAll(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL:
      return action.allPantries;
    default:
      return state;
  }
};

export default shoppingListReducer;
