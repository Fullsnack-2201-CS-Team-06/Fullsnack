import axios from 'axios';

// Action types

const SHOW_ALL_RECIPES = 'SHOW_ALL_RECIPES';

// Action creators

const showAllRecipes = (allRecipes) => {
  return {
    type: SHOW_ALL_RECIPES,
    allRecipes,
  };
};

// Thunk creators

export const fetchAllRecipes = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/recipes?userId=${id}`);
      dispatch(showAllRecipes(data));
    } catch (error) {
      console.error('Error in fetchAllRecipes thunk!!\n\n', error);
    }
  };
};

// Initial state

const initialState = [];

// Reducer

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL_RECIPES: {
      return action.allRecipes;
    }
    default: {
      return state;
    }
  }
};

export default recipesReducer;
