import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ShoppingList.module.css';
import { ListGroup, Table, Button, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchShoppingListHistory } from '../store/ShoppingList';

const ShoppingListHistoryAll = () => {
  const { id } = useSelector((state) => state.auth);
  const { shoppingList } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShoppingListHistory(id));
  }, []);

  const { shoppingHistory } = shoppingList || [];

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Shopping List</h1>
      </div>
      <Container className={styles.shoppingListContainer}>
        <div className={styles.margin}>
          <h2 className={styles.title}>History</h2>
          <Table striped bordered>
            <thead>
              <tr>
                <th className={styles.enlarge}>List Name</th>
                <th className={styles.enlarge}>Date Completed</th>
                <th className={styles.enlarge}>Total Items</th>
              </tr>
            </thead>
            <tbody>
              {shoppingHistory ? (
                shoppingHistory.map((list) => {
                  const totalItems = list.ingredients.reduce((acc, curr) => {
                    return (
                      acc + Number(curr.shoppingListIngredient.sliQuantity)
                    );
                  }, 0);
                  return (
                    <tr key={list.id}>
                      <td className={styles.enlarge}>
                        <Link
                          to={`/list/${list.id}`}
                          className={styles.historyLink}
                        >
                          {list.name}
                        </Link>
                      </td>
                      <td className={styles.enlarge}>{list.checkoutDate}</td>
                      <td className={styles.enlarge}>{totalItems}</td>
                    </tr>
                  );
                })
              ) : (
                <tr></tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default ShoppingListHistoryAll;
