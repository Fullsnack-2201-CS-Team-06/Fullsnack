import React, { useState } from 'react';
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  OverlayTrigger,
  Popover,
  Accordion,
} from 'react-bootstrap';
import styles from './SingleFood.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { editListThunk } from '../store/ShoppingList';

/* The card view of a single food ingredient on the All Foods page.*/
const SingleFood = (props) => {
  const { id } = useSelector((state) => state.auth);
  const { food } = props;
  const dispatch = useDispatch();
  const [showButtonOverlay, setButtonOverlay] = useState(false);

  const handleSubmit = () => {
    dispatch(editListThunk(food.id, id));
    setButtonOverlay(true);
    setTimeout(() => {
      setButtonOverlay(false);
    }, 10000);
  };

  return (
    <Card className={styles.container}>
      <Card.Img variant="top" src={food.image} />
      <Card.Body>
        <Card.Title>{food.name}</Card.Title>
        <ListGroup>
          <ListGroupItem>
            Category: {food.category ? food.category : ''}
          </ListGroupItem>
          <ListGroupItem>Calories: {food.caloriesPerUnit}</ListGroupItem>
          <ListGroupItem>Protein: {food.proteinPerUnit}</ListGroupItem>
          <ListGroupItem>Carbs: {food.carbsPerUnit}</ListGroupItem>
          <ListGroupItem> Fat: {food.fatsPerUnit}</ListGroupItem>
        </ListGroup>
        <OverlayTrigger
          trigger="click"
          placement="right"
          overlay={
            showButtonOverlay ? (
              <Popover id="popover-basic">
                <Popover.Body>
                  You've added <strong>one</strong> {food.name} to your shopping
                  list!
                </Popover.Body>
              </Popover>
            ) : (
              <div></div>
            )
          }
        >
          <Button className={styles.button} onClick={handleSubmit}>
            Add to Shopping List
          </Button>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default SingleFood;
