import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchSinglePantry, editPantryThunk } from '../store/pantry';
import NewPantryItem from './NewPantryItem';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import styles from './PantrySingle.module.css'


const PantrySingle = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const  pantry  = useSelector((state) => state.pantry);
  const { ingredients } = pantry || [];
  const currentPantry = pantry.id


  useEffect(() => {
    console.log("use effect fired", id)
    dispatch(fetchSinglePantry(id));
  }, []);

  async function handleChange(itemId, userId, quantity){
    dispatch(editPantryThunk(itemId, userId, quantity, currentPantry))
  }

  return (
    <div className='PantrySingle'>
      <Container className={styles.container}>
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
                    <td className={styles.column}>{item.name}</td>
                    <td className={styles.column}>{item.category}</td>
                    <td className={styles.column}><Button className={styles.Button} onClick={() => handleChange(item.id, id, quantity-1)}>-</Button> {quantity} 
                    <Button className={styles.Button} onClick={() => handleChange(item.id, id, quantity+1)}>+</Button></td> 
                    <td>
                      <Button className={styles.Button} type="button" onClick={() => handleChange(item.id, id, 0)}>x</Button>
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

export default PantrySingle;
