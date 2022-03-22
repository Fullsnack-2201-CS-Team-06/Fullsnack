import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFoods } from '../store/foods';
import SingleFood from './SingleFood';
import styles from './Food.module.css';

/* This page shows all the ingredients that could exist in a user's pantry and exist as parts of a recipe. Their main purpose is to store general nutritional information and cost per unit of measurement. In a user's view, ingredients can be created manually, but they can also be created automatically whenever new foods are added to recipes, shopping lists, or pantries of the user. Users can access the complete list of ingredients associated with their profile, even for recipes that no longer exist. There, they can manually set or update the nutritional info and cost associated with that ingredient. */

import 'bootstrap/dist/css/bootstrap.min.css';

const Food = () => {
  const { id } = useSelector((state) => state.auth);
  const { foods } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoods(id));
  }, []);

  return (
    <div>
      <div className={styles.search}>
        <label htmlFor="search">Search Foods</label>
        <input name="search" type="text" />
      </div>
      <div className={styles.foodcards}>
        {foods.map((food) => (
          <SingleFood key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Food;
