import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ShoppingList.module.css'
import { ListGroup, Table, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { fetchShoppingListHistory } from '../store/ShoppingList';

const ShoppingListHistoryAll = () => {
  const { id } = useSelector((state) => state.auth);
  const { shoppingList } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchShoppingListHistory(id));
  }, []);

  const { shoppingHistory } = shoppingList || []

  return (
  <div>
   <p>Your Shopping Lists!</p>
<Table>
  <colgroup span="4"></colgroup>
  <tbody>
  <tr>
    <th className={styles.enlarge} >List Name</th>
    <th className={styles.enlarge} >Date Completed</th>
    <th className={styles.enlarge} >Total Items:</th>
  </tr>
  { shoppingHistory ?
  shoppingHistory.map(list => {
    const totalItems = list.ingredients.reduce((acc, curr) => {
      return acc + Number(curr.shoppingListIngredient.sliQuantity)
    }, 0)
    return (
    <tr key={list.id}>
      <td><Link to={`/list/${list.id}`}>{list.name}</Link></td>
      <td>{(list.checkoutDate)}</td>
      <td>{totalItems}</td>
    </tr>)
  }) :
  <tr></tr>
  }
  </tbody>
</Table>
  </div>
  );
};

export default ShoppingListHistoryAll;
