import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';
import React, { useState } from 'react';
import { addFood, updateFood } from '../store/foods';
import { useSelector, useDispatch } from 'react-redux';
import styles from './NewFood.module.css';

const foodCategories = [
  'produce',
  'meat',
  'dairy',
  'dry goods',
  'bakery',
  'beverages',
  'miscellaneous',
];

const unitsOfMeasurement = ['lb', 'oz', 'each', 'fl oz', 'gm', 'mg'];

const NewFood = () => {
  const dispatch = useDispatch();

  const [newFood, setNewFood] = useState({
    name: '',
    uom: 'each',
    category: 'miscellaneous',
    caloriesPerUnit: 0,
    proteinPerUnit: 0,
    carbsPerUnit: 0,
    fatsPerUnit: 0,
    image:
      'https://media.istockphoto.com/vectors/add-photo-icon-vector-id1136809322',
  });

  //FN: Handle update of the fields in the inputs.
  const handleUpdate = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  let { foods } = useSelector((state) => state);
  const handleSubmit = () => {
    newFood.name = newFood.name.toLowerCase();

    //Only update the foods if there is a valid name.
    if (newFood.name.length > 0) {
      //If the name matches an existing food, update the existing food.
      //If not, add the new food.
      const existingFood = foods.filter((food) => food.name === newFood.name);
      if (existingFood.length > 0) {
        dispatch(updateFood(newFood, existingFood[0].id));
      } else {
        dispatch(addFood(newFood));
      }
      //After action dispatch, reset the NewFood inputs.
      setNewFood({
        name: '',
        uom: 'each',
        category: 'miscellaneous',
        caloriesPerUnit: 0,
        proteinPerUnit: 0,
        carbsPerUnit: 0,
        fatsPerUnit: 0,
        image:
          'https://media.istockphoto.com/vectors/add-photo-icon-vector-id1136809322',
      });
    }
  };

  const popover = (
    <Popover>
      <Popover.Header>Add an Image URL</Popover.Header>
      <Popover.Body>
        <input type="text" name="image" onChange={handleUpdate} />
      </Popover.Body>
    </Popover>
  );

  return (
    <Card>
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Card.Img variant="top" src={newFood.image} />
      </OverlayTrigger>
      <Card.Body>
        <ListGroup>
          <ListGroupItem>
            Name:{' '}
            <input
              type="text"
              name="name"
              value={newFood.name}
              onChange={handleUpdate}
            />
          </ListGroupItem>
          <ListGroupItem>
            Category:{' '}
            <select
              name="category"
              value={newFood.category}
              onChange={handleUpdate}
            >
              <option value="">--Choose a Category--</option>
              {foodCategories.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </ListGroupItem>
          <ListGroupItem>
            Calories:{' '}
            <input
              type="number"
              className={styles.newFoodInput}
              name="caloriesPerUnit"
              value={newFood.caloriesPerUnit}
              min="0"
              onChange={handleUpdate}
            />
            {'    '}
            <label htmlFor="uom">Unit: </label>
            {'  '}
            <select name="uom" value={newFood.uom} onChange={handleUpdate}>
              {unitsOfMeasurement.map((uom, i) => (
                <option key={i} value={uom}>
                  {uom}
                </option>
              ))}
            </select>
          </ListGroupItem>
          <ListGroupItem>
            Protein:{' '}
            <input
              type="number"
              className={styles.newFoodInput}
              name="proteinPerUnit"
              value={newFood.proteinPerUnit}
              min="0"
              onChange={handleUpdate}
            />
          </ListGroupItem>
          <ListGroupItem>
            Carbs:{' '}
            <input
              type="number"
              className={styles.newFoodInput}
              name="carbsPerUnit"
              value={newFood.carbsPerUnit}
              min="0"
              onChange={handleUpdate}
            />
          </ListGroupItem>
          <ListGroupItem>
            Fat:{' '}
            <input
              type="number"
              className={styles.newFoodInput}
              name="fatsPerUnit"
              value={newFood.fatsPerUnit}
              min="0"
              onChange={handleUpdate}
            />
          </ListGroupItem>
        </ListGroup>
        <Button onClick={handleSubmit}>Update Foods</Button>
      </Card.Body>
    </Card>
  );
};

export default NewFood;
