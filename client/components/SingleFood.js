import React from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

/* The card view of a single food ingredient on the All Foods page.*/
const SingleFood = (props) => {
  const { food } = props;
  return (
    <Card>
      <Card.Img variant="top" src={food.image} />
      <Card.Body>
        <Card.Title>{food.name}</Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
      <ListGroup>
        <ListGroupItem>Category: {food.category}</ListGroupItem>
        <ListGroupItem>Calories: {food.caloriesPerUnit}</ListGroupItem>
        <ListGroupItem>
          Protein: {food.proteinPerUnit} per {food.uom}
        </ListGroupItem>
        <ListGroupItem>
          Carbs: {food.carbsPerUnit} per {food.uom}
        </ListGroupItem>
        <ListGroupItem>
          Fat: {food.fatPerUnit} per {food.uom}
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Button>Add to Shopping List</Button>
      </Card.Body>
    </Card>
  );
};

export default SingleFood;
