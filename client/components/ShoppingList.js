import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCurrentShoppingList, sendToPantry } from '../store/ShoppingList';
import { fetchAllPantries, createNewPantry } from '../store/pantries'
import ShoppingListForm from './ShoppingListForm'

const ShoppingList = () => {
  const { id } = useSelector((state) => state.auth);
  const { shoppingList, pantries } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { currentList } = shoppingList
  const defaultName = pantries[0] || 'dave'
  const [selectedPantry, setSelectedPantry] = useState(defaultName)
  const [newPantry, setNewPantry] = useState('')
  const { name } = currentList || ''
  const { ingredients } = currentList || []

  useEffect(() => {
    dispatch(fetchCurrentShoppingList(id));
    dispatch(fetchAllPantries(id))
  }, []);
  let otherPantries = []
  let length = 0
  if (ingredients) {
    length = ingredients.length
  }
  if (pantries.length > 1) {
    otherPantries = pantries.slice(1)
  }

  async function handleCreatePantry() {
    dispatch(createNewPantry([{name: newPantry}], id))
  }

  async function handleSubmit() {
    if (typeof selectedPantry === 'string' && ingredients.length) {
      dispatch(sendToPantry(id, currentList, selectedPantry))
    } else if (ingredients.length) {
      dispatch(sendToPantry(id, currentList, pantries[0].id))
    } else {
      window.alert('There are no items to add to your pantry!')
    }
  }

  return (
  <div>
   <p>Shopping List: {name}</p>
   <p><Link to={'/list/history'} >View History</Link></p>
   <form method="GET" id="my_form"></form>
    <table>
      <thead>
        <tr>
          <th>List Items</th>
          <th>Quantity</th>
          <th>Remove item from list</th>
        </tr>
      </thead>
        { ingredients ?
          ingredients.map(item => {
          return (
        <ShoppingListForm key={item.id}  props={item} />
          )
        }):
        <tbody></tbody>
        }
    </table>
    <div>
    <select name="pantries" onChange={(e) => setSelectedPantry(e.target.value)} >
        <option value="1">{defaultName.name}</option>
        { otherPantries.length ?
        otherPantries.map((pantry) => (
          <option key={pantry.id} value={pantry.id}>
            {pantry.name}
          </option>
        )) :
        <></>
        }
        <option value={-1}>Create New Pantry</option>
      </select>
      {selectedPantry < 0 ?
      <form method="GET" id="my_form">
        <label htmlFor='name' >Pantry Name: </label>
        <input type='text' name='name' value={newPantry} onChange={(e) => setNewPantry(e.target.value)} />
        <button name='button' onClick={() => handleCreatePantry()}>Create New Pantry</button>
      </form>
       :
      <form></form>}
      <button name='button' onClick={() => handleSubmit()}>Send list to Pantry</button>
      <p>Total # of unique items: {length}</p>
    </div>
  </div>
  );
};

export default ShoppingList;
