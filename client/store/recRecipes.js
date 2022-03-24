import axios from 'axios';

// ACTION TYPES
const SHOW_REC_RECIPES = 'SHOW_REC_RECIPES';

// ACTION CREATORS
const _showRecRecipes = (recRecipes) => {
  return {
    type: SHOW_REC_RECIPES,
    recRecipes,
  };
};

// THUNKS

//NOTE: This just gets all the recipes not assigned to the user. When we link up the api, we will need to pass user preferences data to retrieve the right results.
export const showRecRecipes = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/recipes/recs?userId=${userId}`);
      dispatch(_showRecRecipes(data));
    } catch (error) {
      console.error('Failed to retrieve the recipe recommendations', error);
    }
  };
};

const recRecipesReducer = (state = [], action) => {
  switch (action.type) {
    case SHOW_REC_RECIPES: {
      return action.recRecipes;
    }
    default: {
      return state;
    }
  }
};

export default recRecipesReducer;
