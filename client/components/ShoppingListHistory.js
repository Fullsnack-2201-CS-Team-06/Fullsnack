import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllShoppingLists } from '../store/ShoppingList';

const ShoppingList = () => {
  const { id } = useSelector((state) => state.auth);
  const { shoppingList } = useSelector((state) => state);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllShoppingLists(id));
  }, []);

  console.log(shoppingList)

  return (
  <div>
   <p>Your Shopping Lists!</p>
<table>
  <colgroup span="4"></colgroup>
  <tr>
    <th>List Name</th>
    <th>Date Completed</th>
    <th>Total Cost</th>
  </tr>
  { shoppingList.map(list => {
    return (
    <tr key={list.id}>
      <td>{list.name}</td>
      <td>{list.checkoutDate}</td>
      <td>{list.totalCost}</td>
    </tr>)
  })}
</table>
  </div>
  );
};

export default ShoppingList;
