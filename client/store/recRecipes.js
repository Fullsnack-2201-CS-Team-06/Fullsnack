import axios from 'axios';

// ACTION TYPES
const SHOW_REC_RECIPES = 'SHOW_REC_RECIPES';
const ADD_NEW_REC_RECIPE = 'ADD_NEW_REC_RECIPE';
const REMOVE_REC_RECIPE = 'REMOVE_REC_RECIPE';

// ACTION CREATORS
const _showRecRecipes = (recRecipes) => {
  return {
    type: SHOW_REC_RECIPES,
    recRecipes,
  };
};

const _createRecRecipe = (recRecipe) => {
  return {
    type: ADD_NEW_REC_RECIPE,
    recRecipe,
  };
};

export const removeRecRecipe = (recRecipeId) => {
  return {
    type: REMOVE_REC_RECIPE,
    recRecipeId,
  };
};

// THUNKS

//NOTE: This just gets all the recipes not assigned to the user. When we link up the api, we will need to pass user preferences data to retrieve the right results.
export const showRecRecipes = (cuisinePref) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `api/recipes/recs?cuisinePref=${cuisinePref}`
      );
      dispatch(_showRecRecipes(data));
    } catch (error) {
      console.error('Failed to retrieve the recipe recommendations', error);
    }
  };
};

export const addRecRecipe = (recRecipe) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`api/recipes/recs`, recRecipe);
      dispatch(_createRecRecipe(data));
    } catch (error) {
      console.error('Failed to add this recipe to the recommendations', error);
    }
  };
};

export const getNewRecRecipes = (apiParams) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('api/recipes/recs/new', { apiParams });
      for (let i = 0; i < data.length; i++) {
        const recipe = data[i].recipe;
        dispatch(
          addRecRecipe({
            name: recipe.label,
            description: recipe.url,
            image: recipe.image,
            cuisineType: recipe.cuisineType[0],
            caloriesPerRecipe: Math.floor(recipe.calories),
            proteinPerRecipe: Math.floor(recipe.totalNutrients.PROCNT.quantity),
            carbsPerRecipe: Math.floor(recipe.totalNutrients.CHOCDF.quantity),
            fatPerRecipe: Math.floor(recipe.totalNutrients.FAT.quantity),
            ingredients: recipe.ingredients.map((ingredient) => {
              return {
                name: ingredient.food,
                uom: ingredient.measure,
                category: ingredient.foodCategory
                  ? ingredient.foodCategory.toLowerCase()
                  : ingredient.foodCategory,
                image: ingredient.image,
                quantity: ingredient.quantity,
              };
            }),
          })
        );
      }
    } catch (error) {
      console.error('Failed to retrieve any rec recipes from the api', error);
    }
  };
};

const recRecipesReducer = (state = [], action) => {
  switch (action.type) {
    case SHOW_REC_RECIPES: {
      let newState = action.recRecipes;
      if (newState.length > 40) {
        newState = newState.slice(0, 40);
      }
      return newState;
    }
    case ADD_NEW_REC_RECIPE: {
      return [action.recRecipe, ...state];
    }
    case REMOVE_REC_RECIPE: {
      return state.filter((recipe) => recipe.id !== action.recRecipeId);
    }
    default: {
      return state;
    }
  }
};

export default recRecipesReducer;
