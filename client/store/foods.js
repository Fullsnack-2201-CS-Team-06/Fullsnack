import axios from 'axios';

//ACTION TYPE
const GET_FOODS = 'GET_FOODS';

//ACTION CREATORS
const _getFoods = (foods) => {
  return {
    type: GET_FOODS,
    foods,
  };
};

//THUNKS
export const getFoods = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/ingredients?userId=${id}`);
      dispatch(_getFoods(data));
    } catch (error) {
      console.error('Failed to retrieve the foods', error);
    }
  };
};

//REDUCER
const foodsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_FOODS: {
      return action.foods;
    }
    default:
      return state;
  }
};

export default foodsReducer;
