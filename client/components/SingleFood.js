import React from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import styles from './SingleFood.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { editListThunk } from '../store/ShoppingList';

/* The card view of a single food ingredient on the All Foods page.*/
const SingleFood = (props) => {
  const { id } = useSelector(state => state.auth)
  const { food } = props;
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(editListThunk(food.id, id));
    console.log(
      'This add-to-shopping-list button will work once the page/allfoods branch is integrated onto main with the shopping list.'
    );
  };

  return (
    <Card>
      <Card.Img variant="top" src={food.image} />
      <Card.Body>
        <Card.Title>
          {food.name} ({food.uom})
        </Card.Title>
        <ListGroup>
          <ListGroupItem>
            Category: {food.category ? food.category : ''}
          </ListGroupItem>
          <ListGroupItem>
            Calories: {food.caloriesPerUnit ? food.caloriesPerUnit : ''}
          </ListGroupItem>
          <ListGroupItem>
            Protein: {food.proteinPerUnit ? food.proteinPerUnit : ''}
          </ListGroupItem>
          <ListGroupItem>
            Carbs: {food.carbsPerUnit ? food.carbsPerUnit : ''}
          </ListGroupItem>
          <ListGroupItem>
            {' '}
            Fat: {food.fatPerUnit ? food.fatPerUnit : ''}
          </ListGroupItem>
        </ListGroup>
        <Button className={styles.button} onClick={handleSubmit}>
          Add to Shopping List
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SingleFood;
