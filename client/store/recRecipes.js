import axios from 'axios';

// ACTION TYPES
const SHOW_REC_RECIPES = 'SHOW_REC_RECIPES';
const ADD_NEW_REC_RECIPE = 'ADD_NEW_REC_RECIPE';

// ACTION CREATORS
const _showRecRecipes = (recRecipes) => {
  return {
    type: SHOW_REC_RECIPES,
    recRecipes,
  };
};

const _addRecRecipe = (recRecipe) => {
  return {
    type: ADD_NEW_REC_RECIPE,
    recRecipe,
  };
};

// THUNKS

//NOTE: This just gets all the recipes not assigned to the user. When we link up the api, we will need to pass user preferences data to retrieve the right results.
export const showRecRecipes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('api/recipes/recs');
      dispatch(_showRecRecipes(data));
    } catch (error) {
      console.error('Failed to retrieve the recipe recommendations', error);
    }
  };
};

export const addRecRecipe = (recRecipe) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('api/recipes/recs', recRecipe);
      dispatch(_addRecRecipe(data));
    } catch (error) {
      console.error('Failed to add this new recipe recommendation', error);
    }
  };
};

const recRecipesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_NEW_REC_RECIPE: {
      return [...state, action.recRecipe];
    }
    case SHOW_REC_RECIPES: {
      return action.recRecipes;
    }
    default: {
      return state;
    }
  }
};

export default recRecipesReducer;
