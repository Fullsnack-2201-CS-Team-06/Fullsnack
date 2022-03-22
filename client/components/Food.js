import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFoods } from '../store/foods';
import SingleFood from './SingleFood';
import NewFood from './NewFood';
import styles from './Food.module.css';

/* This page shows all the ingredients that could exist in a user's pantry and exist as parts of a recipe. Their main purpose is to store general nutritional information and cost per unit of measurement. In a user's view, ingredients can be created manually, but they can also be created automatically whenever new foods are added to recipes, shopping lists, or pantries of the user. Users can access the complete list of ingredients associated with their profile, even for recipes that no longer exist. There, they can manually set or update the nutritional info and cost associated with that ingredient. */

import 'bootstrap/dist/css/bootstrap.min.css';

const Food = () => {
  const { id } = useSelector((state) => state.auth);
  let { foods } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchCriteria, setSearchCriteria] = useState('');

  //Get all foods associated with that user in some way.
  useEffect(() => {
    dispatch(getFoods(id));
  }, []);

  //FN: Set the search criteria upon typing in the search box.
  const editSearch = (e) => {
    setSearchCriteria(e.target.value);
  };

  //Filter foods according to the search criteria.
  if (searchCriteria !== '') {
    foods = foods.filter((food) => food.name.includes(searchCriteria));
  }

  return (
    <div>
      <div className={styles.search}>
        <label htmlFor="search">Search Foods</label>
        <input name="search" type="text" onChange={editSearch} />
      </div>
      <div className={styles.foodcards}>
        <NewFood />
        {foods.map((food) => (
          <SingleFood key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Food;
