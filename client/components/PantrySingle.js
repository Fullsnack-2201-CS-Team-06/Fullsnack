import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSinglePantry, editPantryThunk } from '../store/pantry';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import styles from './PantrySingle.module.css';

const PantrySingle = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { pantry } = useSelector((state) => state);
  const { ingredients } = pantry;
  let currentPantry = pantry.id;

  console.log('pantry: ', pantry);

  async function handleChange(itemId, userId, quantity) {
    dispatch(editPantryThunk(itemId, userId, quantity, currentPantry));
  }

  return (
    <div>
      <Container>
        {ingredients && ingredients.length > 0 ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th className={styles.enlarge}>Item</th>
                <th className={styles.enlarge}>Category</th>
                <th className={styles.enlarge}>Quantity</th>
                <th className={styles.enlarge}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {ingredients
                .sort(function (a, b) {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                  return 0;
                })
                .map((item) => {
                  const quantity = item.pantryIngredient.pantryQty;
                  return (
                    <tr className={styles.row} key={item.id}>
                      <td className={styles.enlarge}>{item.name}</td>
                      <td className={styles.enlarge}>{item.category}</td>
                      <td className={styles.enlarge}>
                        <Button
                          className={styles.qtyButton}
                          variant="primary"
                          onClick={() =>
                            handleChange(item.id, id, quantity - 1)
                          }
                        >
                          -
                        </Button>{' '}
                        {quantity}
                        <Button
                          className={styles.qtyButton}
                          variant="primary"
                          onClick={() =>
                            handleChange(item.id, id, quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </td>
                      <td className={styles.enlarge}>
                        <Button
                          className={styles.qtyButton}
                          variant="primary"
                          type="button"
                          onClick={() => handleChange(item.id, id, 0)}
                        >
                          x
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </thead>
            </Table>
            <h4 style={{margin: '30px'}}>No items in pantry.</h4>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PantrySingle;
