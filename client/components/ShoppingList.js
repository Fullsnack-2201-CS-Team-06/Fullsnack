import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCurrentShoppingList, fetchShoppingListHistory, editListThunk } from '../store/ShoppingList';
import { fetchAllPantries } from '../store/pantries'

const ShoppingList = () => {
  const { id } = useSelector((state) => state.auth);
  const { shoppingList, pantries } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { currentList } = shoppingList
  const [selectedPantry, setSelectedPantry] = useState(pantries[0]);

  useEffect(() => {
    dispatch(fetchCurrentShoppingList(id));
    dispatch(fetchShoppingListHistory(id))
    dispatch(fetchAllPantries(id))
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
    <select name="pantries" >
        <option value="View All Pantries">Select Pantry</option>
        {pantries.map((pantry) => (
          <option key={pantry.id} value={pantry.name}>
            {pantry.name}
          </option>
        ))}
      </select>
      <button name='button'>Send list to Pantry</button>
      <p>Total # of unique items: {length}</p>
      <p>Estimated Total Cost: ${totalCost}</p>
    </div>
  </div>
  );
};

export default ShoppingList;
