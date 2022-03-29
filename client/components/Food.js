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
  const [minProtein, setMinProtein] = useState(0);
  const [maxProtein, setMaxProtein] = useState(100000);
  const [minCarbs, setMinCarbs] = useState(0);
  const [maxCarbs, setMaxCarbs] = useState(100000);
  const [minFat, setMinFat] = useState(0);
  const [maxFat, setMaxFat] = useState(100000);
  //Get all foods associated with that user's pantries, recipes, and shopping lists.
  useEffect(() => {
    dispatch(getFoods());
  }, []);

  //FN: Set the search criteria upon typing in the search box.
  function editSearch(e) {
    setSearchCriteria(e.target.value);
  }

  //FN: Change the category filter.
  function editCategoryFilter(e) {
    setCategoryFilter(e.target.value);
  }

  const memo = {
    minCalories: setMinCalories,
    maxCalories: setMaxCalories,
    minProtein: setMinProtein,
    maxProtein: setMaxProtein,
    minCarbs: setMinCarbs,
    maxCarbs: setMaxCarbs,
    minFat: setMinFat,
    maxFat: setMaxFat,
  };
  function editNutritionRange(e) {
    const setFilter = memo[e.target.name];
    setFilter(Number(e.target.value));
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

  //Filter for the protein range.
  if (minProtein !== 0) {
    foods = foods.filter(
      (food) => food.proteinPerUnit >= minProtein || !food.proteinPerUnit
    );
  }
  if (maxProtein !== 0) {
    foods = foods.filter(
      (food) => food.proteinPerUnit <= maxProtein || !food.proteinPerUnit
    );
  }

  //Filter for the carbs range.
  if (minCarbs !== 0) {
    foods = foods.filter(
      (food) => food.carbsPerUnit >= minCarbs || !food.carbsPerUnit
    );
  }
  if (maxCarbs !== 0) {
    foods = foods.filter(
      (food) => food.carbsPerUnit <= maxCarbs || !food.carbsPerUnit
    );
  }

  //Filter for the fats range.
  if (minFat !== 0) {
    foods = foods.filter(
      (food) => food.fatsPerUnit >= minFat || !food.fatsPerUnit
    );
  }
  if (maxFat !== 0) {
    foods = foods.filter(
      (food) => food.fatsPerUnit <= maxFat || !food.fatsPerUnit
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
              onChange={editNutritionRange}
            />
          </div>
          <div className={styles.minmaxSetting}>
            <label htmlFor="maxCalories">Max Calories: </label>
            <input
              type="number"
              name="maxCalories"
              min="0"
              value={maxCalories}
              onChange={editNutritionRange}
            />
          </div>
        </div>
        <div className={styles.allFoodsSetting}>
          <div className={styles.minmaxSetting}>
            <label htmlFor="minCalories">Min Calories: </label>
            <input
              type="number"
              name="minCalories"
              min="0"
              value={minCalories}
              onChange={editNutritionRange}
            />
          </div>
          <div className={styles.minmaxSetting}>
            <label htmlFor="maxCalories">Max Calories: </label>
            <input
              type="number"
              name="maxCalories"
              min="0"
              value={maxCalories}
              onChange={editNutritionRange}
            />
          </div>
        </div>
        <div className={styles.allFoodsSetting}>
          <div className={styles.minmaxSetting}>
            <label htmlFor="minProtein">Min Protein: </label>
            <input
              type="number"
              name="minProtein"
              min="0"
              value={minProtein}
              onChange={editNutritionRange}
            />
          </div>
          <div className={styles.minmaxSetting}>
            <label htmlFor="maxProtein">Max Protein: </label>
            <input
              type="number"
              name="maxProtein"
              min="0"
              value={maxProtein}
              onChange={editNutritionRange}
            />
          </div>
        </div>
        <div className={styles.allFoodsSetting}>
          <div className={styles.minmaxSetting}>
            <label htmlFor="minCarbs">Min Carbs: </label>
            <input
              type="number"
              name="minCarbs"
              min="0"
              value={minCarbs}
              onChange={editNutritionRange}
            />
          </div>
          <div className={styles.minmaxSetting}>
            <label htmlFor="maxCarbs">Max Carbs: </label>
            <input
              type="number"
              name="maxCarbs"
              min="0"
              value={maxCarbs}
              onChange={editNutritionRange}
            />
          </div>
        </div>
        <div className={styles.allFoodsSetting}>
          <div className={styles.minmaxSetting}>
            <label htmlFor="minFat">Min Fat: </label>
            <input
              type="number"
              name="minFat"
              min="0"
              value={minFat}
              onChange={editNutritionRange}
            />
          </div>
          <div className={styles.minmaxSetting}>
            <label htmlFor="maxFat">Max Fat: </label>
            <input
              type="number"
              name="maxFat"
              min="0"
              value={maxFat}
              onChange={editNutritionRange}
            />
          </div>
        </div>
      </div>
      <div className={styles.foodcards}>
        {/* <NewFood /> */}
        {foods.map((food, i) => (
          <SingleFood key={i} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Food;
