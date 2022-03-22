import axios from 'axios'

// ACTION TYPE

const SHOW_ONE = "SHOW_ONE"

// ACTION CREATORS

export const showOne = (singlePantry) => ({
    type: SHOW_ALL,
    singlePantry
})

// THUNKS

export const fetchOnePantry = (id) => {
    return async (dispatch) => {
      try {
        console.log("OUR THUNK FIRED.")
        const { data } = await axios.get(`/api/pantries/${id}`);
        dispatch(showOne(data));
      } catch (error) {
        console.log(error);
      }
    };
  };


const initialState = [];

const pantryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ONE:
      console.log("OUR REDUCER GOT HIT.")
    return action.singlePantry
    default:
      return state;
  }
};

export default pantryReducer;
