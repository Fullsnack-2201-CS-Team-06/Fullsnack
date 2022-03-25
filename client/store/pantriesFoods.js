import axios from 'axios';

const GET_OUR_FOODS = 'GET_OUR_FOODS';

const _getOurFoods = (foods) => {
  return {
    type: GET_OUR_FOODS,
    foods,
  };
};

export const getOurFoods = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/ingredients/pantries?userId=${id}`
      );
      dispatch(_getOurFoods(data));
    } catch (error) {
      console.error('Failed to retrieve our foods', error);
    }
  };
};

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
