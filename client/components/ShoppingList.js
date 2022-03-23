import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCurrentShoppingList, fetchAllShoppingLists, editListThunk } from '../store/ShoppingList';

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
   <p><Link to={'/list/history'} >View History</Link></p>
<table>
  <colgroup span="4"></colgroup>
  <tbody>
  <tr>
    <td>List Items</td>
    <td>Quantity</td>
    <td>Unit of Measure</td>
    <td>Cost/Item</td>
    <td>Remove item from list</td>
  </tr>
  { ingredients ?
  ingredients.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.shoppingListIngredient.sliQuantity}</td>
        <td>{item.shoppingListIngredient.uom}</td>
        <td>{item.shoppingListIngredient.cost}</td>
        <td><button onClick={() => editListThunk(item, id)}>X</button></td>
      </tr>
    )
  }):
  <tr></tr>
  }
  </tbody>
</table>
  </div>
  );
};

export default ShoppingList;
