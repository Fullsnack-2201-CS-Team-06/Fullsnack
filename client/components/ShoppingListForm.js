import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editListThunk } from '../store/ShoppingList';

const ShoppingListForm = ({props}) => {
  const dispatch = useDispatch()
  const { id } = useSelector((state) => state.auth);
  let {cost = 0} = props.shoppingListIngredient || 0
  const {sliQuantity} = props.shoppingListIngredient || 0
  const {uom} = props.shoppingListIngredient || 0
  const [newCost, setNewCost] = useState(cost)
  const [newQuantity, setNewQuantity] = useState(sliQuantity)

  const handleCostChange = (e) => {
    console.log(e.target.value)
    console.log(newCost)
    setNewCost(e.target.value)
    dispatch(editListThunk(props.id, id, newQuantity, e.target.value))
  }
  const handleQuantityChange = (e) => {
    setNewQuantity(e.target.value)
    dispatch(editListThunk(props.id, id, e.target.value, newCost))
  }
  const handleRemoveItem = () => {
    dispatch(editListThunk(props.id, id, 0, newCost))
  }

return (
    <>
    <tbody>
      <tr>
        <td>{props.name}</td>
        <td>Quantity: <input type="text" name="quantity" value={newQuantity}  onChange={(e) => handleQuantityChange(e)} /> </td>
        <td>{uom}</td>
        <td><input type="text" name="cost" value={newCost} onChange={(e) => handleCostChange(e)} /> </td>
        <td><button onClick={() => handleRemoveItem()}>X</button></td>
      </tr>
    </tbody>
    </>
)
}

export default ShoppingListForm
