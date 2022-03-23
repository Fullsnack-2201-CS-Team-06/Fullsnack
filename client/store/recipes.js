import axios from 'axios';

// Action types

const SHOW_ALL_RECIPES = 'SHOW_ALL_RECIPES';
const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE';

// Action creators

const showAllRecipes = (allRecipes) => {
  return {
    type: SHOW_ALL_RECIPES,
    allRecipes,
  };
};

const _addNewRecipe = (recipe) => {
  return {
    type: ADD_NEW_RECIPE,
    recipe,
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

export const addNewRecipe = (recipe) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/recipes', recipe);
      dispatch(_addNewRecipe(data));
    } catch (error) {
      console.error('Error in addNewRecipe thunk!!\n\n', error);
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
    case ADD_NEW_RECIPE: {
      return [...state, action.recipe];
    }
    default: {
      return state;
    }
  }
};

export default recipesReducer;
