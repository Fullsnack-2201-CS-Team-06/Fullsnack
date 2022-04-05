import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFoods } from '../store/foods';
import SingleFood from './SingleFood';
import NewFood from './NewFood';
import styles from './Food.module.css';
import { Container, Form, Button } from 'react-bootstrap';

/* This page shows all the ingredients that could exist in a user's pantry and exist as parts of a recipe. Their main purpose is to store general nutritional information and cost per unit of measurement. In a user's view, ingredients can be created manually, but they can also be created automatically whenever new foods are added to recipes, shopping lists, or pantries of the user. Users can access the complete list of ingredients associated with their profile, even for recipes that no longer exist. There, they can manually set or update the nutritional info and cost associated with that ingredient. */

import 'bootstrap/dist/css/bootstrap.min.css';

const foodCategories = [
  'vegetables',
  'condiments and sauces',
  'plant-based protein',
  'fruit',
  '100% juice',
  'seafood',
  'meat',
  'dairy',
  'dry goods',
  'bakery',
  'beverages',
  'coffee and tea',
  'miscellaneous',
];

const Food = () => {
  const { id } = useSelector((state) => state.auth);
  let { foods } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchCriteria, setSearchCriteria] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minCalories, setMinCalories] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [minProtein, setMinProtein] = useState('');
  const [maxProtein, setMaxProtein] = useState('');
  const [minCarbs, setMinCarbs] = useState('');
  const [maxCarbs, setMaxCarbs] = useState('');
  const [minFat, setMinFat] = useState('');
  const [maxFat, setMaxFat] = useState('');
  const [hidden, setHidden] = useState(true);
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
  if (minCalories !== '') {
    foods = foods.filter((food) => food.caloriesPerUnit >= minCalories);
  }

  //Filter for those below the maximum calories.
  if (maxCalories !== '') {
    foods = foods.filter(
      (food) => food.caloriesPerUnit <= maxCalories || !food.caloriesPerUnit
    );
  }

  //Filter for the protein range.
  if (minProtein !== '') {
    foods = foods.filter(
      (food) => food.proteinPerUnit >= minProtein || !food.proteinPerUnit
    );
  }
  if (maxProtein !== '') {
    foods = foods.filter(
      (food) => food.proteinPerUnit <= maxProtein || !food.proteinPerUnit
    );
  }

  //Filter for the carbs range.
  if (minCarbs !== '') {
    foods = foods.filter(
      (food) => food.carbsPerUnit >= minCarbs || !food.carbsPerUnit
    );
  }
  if (maxCarbs !== '') {
    foods = foods.filter(
      (food) => food.carbsPerUnit <= maxCarbs || !food.carbsPerUnit
    );
  }

  //Filter for the fats range.
  if (minFat !== '') {
    foods = foods.filter(
      (food) => food.fatsPerUnit >= minFat || !food.fatsPerUnit
    );
  }
  if (maxFat !== '') {
    foods = foods.filter(
      (food) => food.fatsPerUnit <= maxFat || !food.fatsPerUnit
    );
  }

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Foods</h1>
      </div>
      <Container>
        <div className={styles.allfoodsbar}>
          <div className={styles.basic}>
            <Form.Group className={styles.search}>
              <Form.Label htmlFor="search">Search Foods</Form.Label>
              <Form.Control name="search" type="text" onChange={editSearch} />
            </Form.Group>

            <Form.Group className={styles.allFoodsSetting}>
              <Form.Label htmlFor="category-filter">
                Filter Categories
              </Form.Label>
              <Form.Select
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
              </Form.Select>
            </Form.Group>
          </div>
          {hidden ? (
            <Button
              className={styles.buttonLink}
              variant="link"
              onClick={() => setHidden(false)}
            >
              Advanced Filters
            </Button>
          ) : (
            <div className={styles.advanced}>
              <div className={styles.allFoodsSetting}>
                <div className={styles.minmaxSetting}>
                  <Form.Label htmlFor="minCalories">Calories </Form.Label>
                  <Form.Control
                    type="number"
                    name="minCalories"
                    min="0"
                    max="100000"
                    value={minCalories}
                    placeholder="Min"
                    onChange={editNutritionRange}
                  />
                  <Form.Control
                    type="number"
                    name="maxCalories"
                    min="0"
                    max="100000"
                    placeholder="Max"
                    value={maxCalories}
                    onChange={editNutritionRange}
                  />
                </div>
              </div>

              <div className={styles.allFoodsSetting}>
                <div className={styles.minmaxSetting}>
                  <Form.Label htmlFor="minProtein">Protein </Form.Label>
                  <Form.Control
                    type="number"
                    name="minProtein"
                    min="0"
                    placeholder="Min"
                    value={minProtein}
                    onChange={editNutritionRange}
                  />
                  <Form.Control
                    type="number"
                    name="maxProtein"
                    min="0"
                    placeholder="Max"
                    value={maxProtein}
                    onChange={editNutritionRange}
                  />
                </div>
              </div>

              <div className={styles.allFoodsSetting}>
                <div className={styles.minmaxSetting}>
                  <Form.Label htmlFor="minCarbs">Carbs</Form.Label>
                  <Form.Control
                    type="number"
                    name="minCarbs"
                    min="0"
                    placeholder="Min"
                    value={minCarbs}
                    onChange={editNutritionRange}
                  />
                  <Form.Control
                    type="number"
                    name="maxCarbs"
                    min="0"
                    placeholder="Max"
                    value={maxCarbs}
                    onChange={editNutritionRange}
                  />
                </div>
              </div>

              <div className={styles.allFoodsSetting}>
                <div className={styles.minmaxSetting}>
                  <Form.Label htmlFor="minFat">Fat </Form.Label>
                  <Form.Control
                    type="number"
                    name="minFat"
                    min="0"
                    placeholder="Min"
                    value={minFat}
                    onChange={editNutritionRange}
                  />
                  <Form.Control
                    type="number"
                    name="maxFat"
                    min="0"
                    placeholder="Max"
                    value={maxFat}
                    onChange={editNutritionRange}
                  />
                </div>
              </div>

              <Button
                className={styles.buttonLink}
                variant="link"
                onClick={() => setHidden(true)}
              >
                Hide
              </Button>
            </div>
          )}
        </div>
        <div className={styles.foodcards}>
          {/* <NewFood /> */}
          {foods.map((food, i) => (
            <SingleFood key={i} food={food} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Food;
