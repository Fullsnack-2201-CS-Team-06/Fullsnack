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

  const { name } = currentList || ''
  const { ingredients } = currentList || []

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
  { ingredients ?
  ingredients.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.shoppingListIngredient.sliQuantity}</td>
        <td>{item.shoppingListIngredient.uom}</td>
        <td>{item.shoppingListIngredient.cost}</td>
      </tr>
    )
  }):
  <tr>Add some items!</tr>
  }
</table>
  </div>
  );
};

export default ShoppingList;
