import axios from 'axios';
import history from '../history';

// TOKEN

const TOKEN = 'token';

// ACTION TYPE

const SHOW_ONE = 'SHOW_ONE';
const ADD_PANTRY_ITEM = 'ADD_PANTRY_ITEM';
const EDIT_PANTRY = 'EDIT_PANTRY';

// ACTION CREATORS

export const showOne = (singlePantry) => ({
  type: SHOW_ONE,
  singlePantry,
});

export const updatePantry = (updatePantry) => ({
  type: ADD_PANTRY_ITEM,
  updatePantry,
});

export const editPantry = (editPantry) => ({
  type: EDIT_PANTRY,
  editPantry,
});

// THUNKS

export const fetchSinglePantry = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem(TOKEN);
      const { data } = await axios.get(`/api/pantries/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(showOne(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPantryItemThunk = (itemUpdate) => {
  return async (dispatch) => {
    const { id } = itemUpdate;
    try {
      const token = localStorage.getItem(TOKEN);
      const { data } = await axios.post(`/api/pantries/add`, itemUpdate, {
        headers: {
          authorization: token,
        },
      });
      dispatch(updatePantry(data));
    } catch (error) {
      console.log(error);
    }
    history.push(`/pantries`);
  };
};

export const editPantryThunk = (itemId, userId, quantity, currentPantryId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem(TOKEN);
      const { data } = await axios.put(
        `/api/pantries?userId=${userId}`,
        {
          itemId,
          quantity,
          currentPantryId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(editPantry(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

const pantryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ONE:
      return action.singlePantry;
    case ADD_PANTRY_ITEM:
      return action.updatePantry;
    case EDIT_PANTRY:
      return action.editPantry;
    default:
      return state;
  }
};

export default pantryReducer;
