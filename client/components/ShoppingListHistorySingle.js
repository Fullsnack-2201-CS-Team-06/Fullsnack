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


  useEffect(() => {
    dispatch(setSingleHistoryView(match.params.listId))
  }, []);

  const { name } = singleHistory || ''
  const { ingredients } = singleHistory || []
  let length = 0
  if (ingredients) length = ingredients.length

  return (
  <div>
   <p>Shopping List: {name}</p>
   <p><Link to={'/list/history'} >Back to History</Link></p>
<table>
  <colgroup span="4"></colgroup>
  <tbody>
  <tr>
    <td>List Items</td>
    <td>Quantity</td>
    <td>Unit of Measure</td>
  </tr>
  { ingredients ?
  ingredients.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.shoppingListIngredient.sliQuantity}</td>
        <td>{item.uom}</td>
      </tr>
    )
  }):
  <tr></tr>
  }
  </tbody>
</table>
    <div>
      <p>Total # of unique items: {length}</p>
    </div>
  </div>
  );
};

export default ShoppingListHistorySingle;
