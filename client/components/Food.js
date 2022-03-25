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
  const [minCalories, setMinCalories] = useState(0);
  const [maxCalories, setMaxCalories] = useState(100000);
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

  function editCaloriesRange(e) {
    if (e.target.name === 'minCalories') {
      setMinCalories(Number(e.target.value));
    } else if (e.target.name === 'maxCalories') {
      setMaxCalories(Number(e.target.value));
    }
  }

  //Filter foods according to the search criteria.
  if (searchCriteria !== '') {
    foods = foods.filter((food) => food.name.includes(searchCriteria));
  }

  //Filter foods according to a selected category.
  if (categoryFilter === 'other') {
    foods = foods.filter((food) => !foodCategories.includes(food.category));
  } else if (categoryFilter !== '') {
    foods = foods.filter((food) => food.category === categoryFilter);
  }

  //Filter for those above the minimum calories.
  if (minCalories !== 0) {
    foods = foods.filter((food) => food.caloriesPerUnit >= minCalories);
  }

  //Filter for those below the maximum calories.
  if (maxCalories !== 0) {
    foods = foods.filter(
      (food) => food.caloriesPerUnit <= maxCalories || !food.caloriesPerUnit
    );
  }

  return (
    <div>
      <div className={styles.allfoodsbar}>
        <div className={styles.search}>
          <label htmlFor="search">Search Foods</label>
          <input name="search" type="text" onChange={editSearch} />
        </div>
        <div className={styles.allFoodsSetting}>
          <label htmlFor="category-filter">Filter Categories: </label>
          <select
            name="category-filter"
            value={categoryFilter}
            onChange={editCategoryFilter}
          >
            {' '}
            <option value="">See All</option>
            {foodCategories.map((food, i) => (
              <option key={i} value={food}>
                {food}
              </option>
            ))}
            <option value="other">other</option>
          </select>
        </div>
        <div className={styles.allFoodsSetting}>
          <div className={styles.minmaxSetting}>
            <label htmlFor="minCalories">Min Calories: </label>
            <input
              type="number"
              name="minCalories"
              min="0"
              value={minCalories}
              onChange={editCaloriesRange}
            />
          </div>
          <div className={styles.minmaxSetting}>
            <label htmlFor="maxCalories">Max Calories: </label>
            <input
              type="number"
              name="maxCalories"
              min="0"
              value={maxCalories}
              onChange={editCaloriesRange}
            />
          </div>
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
