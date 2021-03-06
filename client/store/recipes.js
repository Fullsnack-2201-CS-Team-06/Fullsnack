import axios from 'axios';

// Token

const TOKEN = 'token';

// Action types

const SHOW_ALL_RECIPES = 'SHOW_ALL_RECIPES';
const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE';
const ADD_REC_TO_MY_RECIPES = 'ADD_REC_TO_MY_RECIPES';
const UPDATE_RECIPE = 'UPDATE_RECIPE';
const DELETE_RECIPE = 'DELETE_RECIPE';

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

const _addRecRecipe = (recRecipe) => {
  return {
    type: ADD_REC_TO_MY_RECIPES,
    recRecipe,
  };
};

const _updateRecipe = (recipe) => {
  return {
    type: UPDATE_RECIPE,
    recipe,
  };
};

const _deleteRecipe = (recipe) => {
  return {
    type: DELETE_RECIPE,
    recipe,
  };
};

// Thunk creators

export const fetchAllRecipes = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem(TOKEN);
      const { data } = await axios.get(`/api/recipes?userId=${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(showAllRecipes(data));
    } catch (error) {
      console.error('Error in fetchAllRecipes thunk!!\n\n', error);
    }
  };
};

export const addNewRecipe = (recipe) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem(TOKEN);
      const { data } = await axios.post('/api/recipes', recipe, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_addNewRecipe(data));
    } catch (error) {
      console.error('Error in addNewRecipe thunk!!\n\n', error);
    }
  };
};

export const addRecToMyRecipes = (recRecipeId, userId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem(TOKEN);
      const { data } = await axios.put(
        `/api/recipes/recs/${recRecipeId}?userId=${userId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(_addRecRecipe(data));
    } catch (error) {
      console.error('Failed to add this new recipe recommendation', error);
    }
  };
};

export const updateRecipe = (recipe, history) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem(TOKEN);
      const { data } = await axios.put(`/api/recipes/${recipe.id}`, recipe, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_updateRecipe(data));
      history.push(`/recipes/${recipe.id}`);
    } catch (error) {
      console.error('Error in updateRecipe thunk!!\n\n', error);
    }
  };
};

export const deleteRecipe = (id, history) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem(TOKEN);
      const { data } = await axios.delete(`/api/recipes/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_deleteRecipe(data));
      if (history) {
        history.push('/recipes');
      }
    } catch (error) {
      console.error('Error in deleteRecipe thunk!!\n\n', error);
    }
  };
};

// Initial state

const initialState = [];

// Reducer

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REC_TO_MY_RECIPES: {
      return [...state, action.recRecipe];
    }
    case SHOW_ALL_RECIPES: {
      return action.allRecipes;
    }
    case ADD_NEW_RECIPE: {
      return [...state, action.recipe];
    }
    case UPDATE_RECIPE: {
      return state.map((recipe) =>
        recipe.id === action.recipe.id ? action.recipe : recipe
      );
    }
    case DELETE_RECIPE: {
      return state.filter((recipe) => recipe.id !== action.recipe.id);
    }
    default: {
      return state;
    }
  }
};

export default recipesReducer;
