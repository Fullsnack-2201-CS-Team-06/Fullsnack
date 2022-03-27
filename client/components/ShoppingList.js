import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchCurrentShoppingList, sendToPantry } from '../store/ShoppingList';
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
  const { name } = currentList || ''
  const { ingredients } = currentList || []
  let { totalCost } = currentList || 0

  useEffect(() => {
    dispatch(fetchCurrentShoppingList(id));
    dispatch(fetchAllPantries(id))
  }, []);

  if (ingredients) {
  totalCost = ingredients.reduce((acc, curr) => {
    return acc + Number(curr.shoppingListIngredient.sliQuantity) * Number(curr.shoppingListIngredient.cost)
  }, 0)
  }


  let length = 0
  if (ingredients) length = ingredients.length

  async function handleSubmit() {
    if (typeof selectedPantry === 'number' && ingredients.length) {
      dispatch(sendToPantry(id, currentList, selectedPantry))
    } else if (ingredients.length) {
      dispatch(sendToPantry(id, currentList, pantries[0].id))
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
        <tbody></tbody>
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
      <p>Total Cost: ${totalCost}</p>
    </div>
  </div>
  );
};

export default ShoppingList;
