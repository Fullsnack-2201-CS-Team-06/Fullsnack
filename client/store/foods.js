import axios from 'axios';

//ACTION TYPE
const GET_FOODS = 'GET_FOODS';
const ADD_FOOD = 'ADD_FOOD';
const UPDATE_FOOD = 'UPDATE_FOOD';

//ACTION CREATORS
const _getFoods = (foods) => {
  return {
    type: GET_FOODS,
    foods,
  };
};

const _addFood = (food) => {
  return {
    type: ADD_FOOD,
    food,
  };
};

const _updateFood = (food) => {
  return {
    type: UPDATE_FOOD,
    food,
  };
};

//THUNKS
export const getFoods = (id) => {
  return async (dispatch) => {
    try {
      if (id) {
        const { data } = await axios.get(`/api/ingredients?userId=${id}`);
        dispatch(_getFoods(data));
      } else {
        const { data } = await axios.get('/api/ingredients');
        dispatch(_getFoods(data));
      }
    } catch (error) {
      console.error('Failed to retrieve the foods', error);
    }
  };
};

export const addFood = (food) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/ingredients', food);
      dispatch(_addFood(data));
    } catch (error) {
      console.error('Failed to add this food', error);
    }
  };
};

export const updateFood = (food, id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/ingredients/${id}`, food);
      dispatch(_updateFood(data));
    } catch (error) {
      console.error('Failed to update this food', error);
    }
  };
};

//REDUCER
const foodsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FOOD: {
      return [action.food, ...state];
    }
    case UPDATE_FOOD: {
      return state.map((food) => {
        if (food.id === action.food.id) {
          return action.food;
        } else {
          return food;
        }
      });
    }
    case GET_FOODS: {
      return action.foods;
    }
    default:
      return state;
  }
};

export default foodsReducer;
