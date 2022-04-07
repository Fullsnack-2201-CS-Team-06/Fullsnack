import axios from 'axios';

// Token
const TOKEN = 'token';

// Action Types
const GET_OUR_FOODS = 'GET_OUR_FOODS';

// Action Creators
const _getOurFoods = (foods) => {
  return {
    type: GET_OUR_FOODS,
    foods,
  };
};

// Thunk Creators
export const getOurFoods = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem(TOKEN);
      const { data } = await axios.get(
        `/api/ingredients/pantries?userId=${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(_getOurFoods(data));
    } catch (error) {
      console.error('Failed to retrieve our foods', error);
    }
  };
};

// Reducer
const pantriesFoodsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_OUR_FOODS: {
      return action.foods;
    }
    default:
      return state;
  }
};

export default pantriesFoodsReducer;
