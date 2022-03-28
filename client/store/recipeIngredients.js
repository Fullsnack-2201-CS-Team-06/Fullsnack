import axios from 'axios';

// Action types

const REMOVE_RECIPE_INGREDIENT = 'REMOVE_RECIPE_INGREDIENT';

// Action creators

const _removeRecipeIngredient = (recipeIngredient) => {
  return {
    type: REMOVE_RECIPE_INGREDIENT,
    recipeIngredient,
  };
};

// Thunk creators

export const removeRecipeIngredient = (recipeId, ingredientId) => {
  return async (dispatch) => {
    try {
      const { data } = axios.put(
        `/api/recipes/${recipeId}/removeIngredient/${ingredientId}`
      );
      dispatch(_removeRecipeIngredient(data));
    } catch (error) {
      console.error('Error in removeRecipeIngredient thunk!!\n\n', error);
    }
  };
};

// Initial state

const initState = [];

// Reducer

const recipeIngredientReducer = (state = initState, action) => {
  switch (action.type) {
    case REMOVE_RECIPE_INGREDIENT: {
      return state.filter(
        (recipeIngredient) => recipeIngredient.id !== action.recipeIngredient.id
      );
    }
  }
};

export default recipeIngredientReducer
