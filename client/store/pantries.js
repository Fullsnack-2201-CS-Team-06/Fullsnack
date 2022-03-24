import axios from 'axios';

// ACTION TYPE

const SHOW_ALL = 'SHOW_ALL';
const CREATE_NEW_PANTRY = 'CREATE_NEW_PANTRY'

// ACTION CREATORS

export const showAll = (allPantries) => ({
  type: SHOW_ALL,
  allPantries,
});

export const _createNewPantry = (newPantry) => {
  type: CREATE_NEW_PANTRY,
  newPantry
}

// THUNKS

export const fetchAllPantries = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/pantries?userId=${id}`);
      dispatch(showAll(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

const pantriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL:
      return action.allPantries;
    default:
      return state;
  }
};

export default pantriesReducer;
