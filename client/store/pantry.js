import axios from 'axios'

// ACTION TYPE

const SHOW_ONE = "SHOW_ONE"
const ADD_PANTRY_ITEM = "ADD_PANTRY_ITEM"
const EDIT_PANTRY = "EDIT_PANTRY"

// ACTION CREATORS

export const showOne = (singlePantry) => ({
    type: SHOW_ONE,
    singlePantry
})

export const addPantryItem = (addPantryItem) => ({
  type: ADD_PANTRY_ITEM,
  addPantryItem
})

export const editPantry = (editPantry) => ({
  type: EDIT_PANTRY,
  editPantry
})

// THUNKS

export const fetchOnePantry = (id) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/api/pantries/${id}`);
        dispatch(showOne(data));
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const addPantryThunk = (addPantryItem) => {
    return async(dispatch) => {
      try {
        console.log("ADD PANTRY THUNK FIRED.")
        const { data } = await axios.post(`/api/pantries`, addPantryItem)
        dispatch(addPantryItem(data))
      } catch (error) {
        console.log(error)
      }
    }
  }


  export const editPantryThunk = (itemId, userId, quantity) => {
    return async(dispatch) => {
      try {
        const { data } = await axios.put(`/api/pantries?userId=${userId}`, {
          itemId, quantity
        })
        dispatch(editPantry(data))
      } catch (error) {
        console.log(error)
      }
    }
  }


const initialState = {};

const pantryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ONE: 
    return action.singlePantry
    case ADD_PANTRY_ITEM:
      return action.addPantryItem
    case EDIT_PANTRY:
      return action.editPantry
    default:
      return state;
  }
};

export default pantryReducer;
