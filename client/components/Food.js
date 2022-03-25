import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFoods } from '../store/foods';
import SingleFood from './SingleFood';
import NewFood from './NewFood';
import styles from './Food.module.css';

/* This page shows all the ingredients that could exist in a user's pantry and exist as parts of a recipe. Their main purpose is to store general nutritional information and cost per unit of measurement. In a user's view, ingredients can be created manually, but they can also be created automatically whenever new foods are added to recipes, shopping lists, or pantries of the user. Users can access the complete list of ingredients associated with their profile, even for recipes that no longer exist. There, they can manually set or update the nutritional info and cost associated with that ingredient. */

import 'bootstrap/dist/css/bootstrap.min.css';

const foodCategories = [
  'produce',
  'meat',
  'dairy',
  'dry goods',
  'bakery',
  'beverages',
  'miscellaneous',
];

const Food = () => {
  const { id } = useSelector((state) => state.auth);
  let { foods } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchCriteria, setSearchCriteria] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  //Get all foods associated with that user's pantries, recipes, and shopping lists.
  useEffect(() => {
    dispatch(getFoods(id));
  }, []);

  //FN: Set the search criteria upon typing in the search box.
  function editSearch(e) {
    setSearchCriteria(e.target.value);
  }

  //FN: Change the category filter.
  function editCategoryFilter(e) {
    setCategoryFilter(e.target.value);
  }

  //Filter foods according to the search criteria.
  if (searchCriteria !== '') {
    foods = foods.filter((food) => food.name.includes(searchCriteria));
  }

  if (categoryFilter !== '') {
    foods = foods.filter((food) => food.category === categoryFilter);
  }

  //Filter foods according to the category filter criteria.

  return (
    <div>
      <div className={styles.allfoodsbar}>
        <div className={styles.search}>
          <label htmlFor="search">Search Foods</label>
          <input name="search" type="text" onChange={editSearch} />
        </div>
        <div className={styles.filterCategories}>
          <label htmlFor="category-filter">Filter Categories: </label>
          <select
            name="category-filter"
            value={categoryFilter}
            onChange={editCategoryFilter}
          >
            {' '}
            <option value="">Select a Filter</option>
            {foodCategories.map((food, i) => (
              <option key={i} value={food}>
                {food}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.foodcards}>
        <NewFood />
        {foods.map((food, i) => (
          <SingleFood key={i} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Food;
