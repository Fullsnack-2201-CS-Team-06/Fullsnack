import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSinglePantry, editPantryThunk } from '../store/pantry';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import styles from './PantrySingle.module.css';

const PantrySingle = (props) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { pantry } = useSelector((state) => state);
  const { ingredients } = pantry 
  let currentPantry = pantry.id 

  

  async function handleChange(itemId, userId, quantity) {
    dispatch(editPantryThunk(itemId, userId, quantity, currentPantry));
  }

  return (
    <div>
      <Container className={styles.container}>
        <Table striped bordered hover size='sm'>
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
              ingredients
                .sort(function (a, b) {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                  return 0;
                })
                .map((item) => {
                  const quantity = item.pantryIngredient.pantryQty;
                  return (
                    <tr className={styles.row} key={item.id}>
                      <td className={styles.column}>{item.name}</td>
                      <td className={styles.column}>{item.category}</td>
                      <td className={styles.column}>
                        <Button
                          className={styles.Button}
                          variant='outline-primary'
                          onClick={() =>
                            handleChange(item.id, id, quantity - 1)
                          }
                        >
                          -
                        </Button>{' '}
                        {quantity}
                        <Button
                          className={styles.Button}
                          variant='outline-primary'
                          onClick={() =>
                            handleChange(item.id, id, quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </td>
                      <td>
                        <Button
                          className={styles.Button}
                          variant='outline-primary'
                          type='button'
                          onClick={() => handleChange(item.id, id, 0)}
                        >
                          x
                        </Button>
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
        </Table>
      </Container>
    </div>
  );
};

export default PantrySingle;
