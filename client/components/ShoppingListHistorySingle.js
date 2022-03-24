import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setSingleHistoryView, editListThunk } from '../store/ShoppingList';

const ShoppingListHistorySingle = ({match}) => {
  const { id } = useSelector((state) => state.auth);
  const { shoppingList } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { singleHistory } = shoppingList
  const history = useHistory()

  console.log('singleHistory', singleHistory)

  useEffect(() => {
    dispatch(setSingleHistoryView(match.params.listId))
  }, []);

  const { name } = singleHistory || ''
  const { ingredients } = singleHistory || []
  const { totalCost } = singleHistory || 0
  let length = 0
  if (ingredients) length = ingredients.length

  // async function handleChange(itemId, userId, quantity) {
  //   dispatch(editListThunk(itemId, userId, quantity))
  // }

  return (
  <div>
   <p>{name}</p>
   <p><Link to={'/list/history'} >Back to History</Link></p>
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
        <td>{item.shoppingListIngredient.sliQuantity}</td>
        <td>{item.shoppingListIngredient.uom}</td>
        <td>{item.shoppingListIngredient.cost}</td>
      </tr>
    )
  }):
  <tr></tr>
  }
  </tbody>
</table>
    <div>
      <p>Total # of unique items: {length}</p>
      <p>Total Cost: ${totalCost}</p>
    </div>
  </div>
  );
};

export default ShoppingListHistorySingle;
