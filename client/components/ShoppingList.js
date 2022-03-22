import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentShoppingList, fetchAllShoppingLists } from '../store/ShoppingList';

const ShoppingList = () => {
  const { id } = useSelector((state) => state.auth);
  const { currentList } = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentShoppingList(id));
    dispatch(fetchAllShoppingLists(id))
  }, []);

  const {name} = currentList || ''
  console.log(name)

  return (
  <div>
   <p>{name}</p>
<table>
  <colgroup span="4"></colgroup>
  <tr>
    <th>List Items</th>
    <th>Quantity</th>
    <th>Unit of Measure</th>
    <th>Cost/Item</th>
  </tr>
</table>
  </div>
  );
};

export default ShoppingList;
