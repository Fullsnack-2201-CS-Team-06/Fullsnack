import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPantries } from '../store/pantries';
import { fetchSinglePantry } from '../store/pantry'

import NewPantryItem from './NewPantryItem';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const PantryRefactor = () => {
  const { id } = useSelector((state) => state.auth);
  const { pantries } = useSelector((state) => state);
  const [selectedPantry, setSelectedPantry] = useState(0);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAllPantries(id));
  }, []);

  const handlePantryChange = (e) => { 
    setSelectedPantry(e);
    console.log("Did I fire", e)
    dispatch(fetchSinglePantry(e))
  };

  return (
    <div>
    <select name='pantries' onChange={(e) => handlePantryChange(e.target.value)}>
      {pantries.map((pantry) => (
        <option key={pantry.id} value={pantry.id}>
          {pantry.name}
        </option>
      ))}
    </select>
    <Container>
      <Table striped>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ingredients ? (
            ingredients.sort(function(a, b) {
              if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              return 0;
             }).map((item) => {
              const quantity = item.pantryIngredient.pantryQty
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td><Button onClick={() => handleChange(item.id, id, quantity-1)}>-</Button> {quantity} 
                  <Button onClick={() => handleChange(item.id, id, quantity+1)}>+</Button></td> 
                  <td>
                    <Button onClick={() => handleChange(item.id, id, 0)}>x</Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Nothing to see here.</td>
            </tr>
          )}
        </tbody>
        <NewPantryItem />
      </Table>
    </Container>
  </div>
  );
};

export default PantryRefactor;
