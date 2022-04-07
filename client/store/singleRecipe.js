import axios from 'axios';

// Token

const TOKEN = 'token';

// Action types

const SET_SINGLE_RECIPE = 'SET_SINGLE_RECIPE';

// Action creators

const setSingleRecipe = (recipe) => {
  return {
    type: SET_SINGLE_RECIPE,
    recipe,
  };
};

// Thunk creators

export const fetchSingleRecipe = (recipeId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem(TOKEN);
      const { data } = await axios.get(`/api/recipes/${recipeId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setSingleRecipe(data));
    } catch (error) {
      console.error('Error in fetchSingleRecipe thunk!!\n\n', error);
    }
  };
};

// Initial state

const initialState = {};

// Reducer

const singleRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_RECIPE: {
      return action.recipe;
    }
    default: {
      return state;
    }
  }
};

export default singleRecipeReducer;
