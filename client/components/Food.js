import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFoods } from '../store/foods';
import SingleFood from './SingleFood';
import styles from './Food.module.css';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

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

  useEffect(() => {
    dispatch(getFoods(id));
  }, []);

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
        <input name="search" type="text" onChange={(e) => editSearch(e)} />
      </div>
      <div className={styles.foodcards}>
        <Card>
          <Card.Img
            variant="top"
            src="https://media.istockphoto.com/vectors/add-photo-icon-vector-id1136809322"
          />
          <Card.Body>
            <Card.Title>Add a New Food Type</Card.Title>
            <ListGroup>
              <ListGroupItem>
                Name: <input type="text" name="name" />
              </ListGroupItem>
              <ListGroupItem>
                Category:{' '}
                <select name="category">
                  <option value="">--Choose a Category--</option>
                  {foodCategories.map((category) => (
                    <option value={category}>{category}</option>
                  ))}
                </select>
              </ListGroupItem>
              <ListGroupItem>
                Calories: <input type="number" name="caloriesPerUnit" min="0" />
              </ListGroupItem>
              <ListGroupItem>
                Protein: <input type="number" name="proteinPerUnit" min="0" />
              </ListGroupItem>
              <ListGroupItem>
                Carbs: <input type="number" name="carbsPerUnit" min="0" />
              </ListGroupItem>
              <ListGroupItem>
                Fat: <input type="number" name="fatPerUnit" min="0" />
              </ListGroupItem>
            </ListGroup>
            <Button>Add Food</Button>
          </Card.Body>
        </Card>
        {foods.map((food) => (
          <SingleFood key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Food;
