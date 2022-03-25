import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchCurrentShoppingList, fetchShoppingListHistory, editListThunk, sendToPantry } from '../store/ShoppingList';
import { fetchAllPantries } from '../store/pantries'
import ShoppingListForm from './ShoppingListForm'

const ShoppingList = () => {
  const { id } = useSelector((state) => state.auth);
  const { shoppingList, pantries } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { currentList } = shoppingList
  const [selectedPantry, setSelectedPantry] = useState(pantries[0]);
  const history = useHistory()
  const [newPantry, setNewPantry] = useState('')

  useEffect(() => {
    dispatch(fetchCurrentShoppingList(id));
    dispatch(fetchShoppingListHistory(id))
    dispatch(fetchAllPantries(id))
  }, []);

  const { name } = currentList || ''
  const { ingredients } = currentList || []
  const { totalCost } = currentList || 0
  let length = 0
  if (ingredients) length = ingredients.length

  async function handleChange(itemId, userId, quantity) {
    dispatch(editListThunk(itemId, userId, quantity))
  }

  async function handleSubmit() {
    if (typeof selectedPantry === 'number' && ingredients.length) {
      dispatch(sendToPantry(id, currentList))
      history.push(`/pantries/${selectedPantry}`)
    } else if (ingredients.length) {
      dispatch(sendToPantry(id, currentList))
      history.push(`/pantries/${pantries[0].id}`)
    } else {
      window.alert('There are no items to add to your pantry!')
    }
  }

  return (
  <div>
   <p>{name}</p>
   <p><Link to={'/list/history'} >View History</Link></p>
   <form method="GET" id="my_form"></form>
    <table>
      <thead>
        <tr>
          <th>List Items</th>
          <th>Quantity</th>
          <th>Unit of Measure</th>
          <th>Cost/Item</th>
          <th>Remove item from list</th>
        </tr>
      </thead>
        { ingredients ?
          ingredients.map(item => {
          return (
        <ShoppingListForm key={item.id}  props={item} />
          )
        }):
        <tr></tr>
        }
    </table>
    <div>
    <select name="pantries" onChange={(e) => setSelectedPantry(e.target.value)} >
        <option value="View All Pantries">Select Pantry</option>
        {pantries.map((pantry) => (
          <option key={pantry.id} value={pantry.id}>
            {pantry.name}
          </option>
        ))}
        <option value={-1}>Create New Pantry</option>
      </select>
      {selectedPantry < 0 ?
      <form>
        <label htmlFor='name' >Pantry Name: </label>
        {/* <input type='text' name='name' value={newPantry.name} onSubmit={() => dispatch()} /> */}
      </form> :
      <form></form>}
      <button name='button' onClick={() => handleSubmit()}>Send list to Pantry</button>
      <p>Total # of unique items: {length}</p>
      <p>Estimated Total Cost: ${totalCost}</p>
    </div>
  </div>
  );
};

export default ShoppingList;
