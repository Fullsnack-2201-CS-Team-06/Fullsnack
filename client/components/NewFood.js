import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import React, { useState } from 'react';

const foodCategories = [
  'produce',
  'meat',
  'dairy',
  'dry goods',
  'bakery',
  'beverages',
  'miscellaneous',
];

const NewFood = () => {
  const [newFood, setNewFood] = useState({
    name: '',
    uom: 'each',
    category: 'miscellaneous',
    caloriesPerUnit: 0,
    proteinPerUnit: 0,
    carbsPerUnit: 0,
    fatsPerUnit: 0,
  });

  //FN: Handle update of the fields in the inputs.
  const handleUpdate = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  console.log('newFood: ', newFood);

  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://media.istockphoto.com/vectors/add-photo-icon-vector-id1136809322"
      />
      <Card.Body>
        <ListGroup>
          <ListGroupItem>
            Name: <input type="text" name="name" onChange={handleUpdate} />
          </ListGroupItem>
          <ListGroupItem>
            Category:{' '}
            <select name="category" onChange={handleUpdate}>
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
              name="caloriesPerUnit"
              min="0"
              onChange={handleUpdate}
            />
          </ListGroupItem>
          <ListGroupItem>
            Protein:{' '}
            <input
              type="number"
              name="proteinPerUnit"
              min="0"
              onChange={handleUpdate}
            />
          </ListGroupItem>
          <ListGroupItem>
            Carbs:{' '}
            <input
              type="number"
              name="carbsPerUnit"
              min="0"
              onChange={handleUpdate}
            />
          </ListGroupItem>
          <ListGroupItem>
            Fat:{' '}
            <input
              type="number"
              name="fatPerUnit"
              min="0"
              onChange={handleUpdate}
            />
          </ListGroupItem>
        </ListGroup>
        <Button>Add Food</Button>
      </Card.Body>
    </Card>
  );
};

export default NewFood;
