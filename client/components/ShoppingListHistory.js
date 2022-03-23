import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShoppingListHistory } from '../store/ShoppingList';

const ShoppingList = () => {
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
<table>
  <colgroup span="4"></colgroup>
  <tbody>
  <tr>
    <th>List Name</th>
    <th>Date Completed</th>
    <th>Total Cost</th>
  </tr>
  { shoppingHistory ?
  shoppingHistory.map(list => {
    return (
    <tr key={list.id}>
      <td><Link to={'/list/'}>{list.name}</Link></td>
      <td>{list.checkoutDate}</td>
      <td>{list.totalCost}</td>
    </tr>)
  }) :
  <tr></tr>
  }
  </tbody>
</table>
  </div>
  );
};

export default ShoppingList;
