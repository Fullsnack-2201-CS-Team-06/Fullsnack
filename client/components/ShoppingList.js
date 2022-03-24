import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCurrentShoppingList, fetchShoppingListHistory, editListThunk } from '../store/ShoppingList';

const ShoppingList = () => {
  const { id } = useSelector((state) => state.auth);
  const { currentList } = useSelector((state) => state.shoppingList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentShoppingList(id));
    dispatch(fetchShoppingListHistory(id))
  }, []);

  const { name } = currentList || ''
  const { ingredients } = currentList || []
  const { totalCost } = currentList || 0
  let length = 0
  if (ingredients) {
    length = ingredients.length
  }

  async function handleChange(itemId, userId, quantity) {
    dispatch(editListThunk(itemId, userId, quantity))
  }

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
    const quantity = item.shoppingListIngredient.sliQuantity
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>
        <button onClick={() => handleChange(item.id, id, quantity - 1)}>-</button>
          {item.shoppingListIngredient.sliQuantity}
          <button onClick={() => handleChange(item.id, id, quantity + 1)}>+</button>
          </td>
        <td>{item.shoppingListIngredient.uom}</td>
        <td>{item.shoppingListIngredient.cost}</td>
        <td><button onClick={() => handleChange(item.id, id, 0)}>X</button></td>
      </tr>
    )
  }):
  <tr></tr>
  }
  </tbody>
</table>
    <div>
      <p>Total # of unique items: {length}</p>
      <p>Estimated Total Cost: ${totalCost}</p>
    </div>
  </div>
  );
};

export default ShoppingList;
