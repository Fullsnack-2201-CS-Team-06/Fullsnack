import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editListThunk } from '../store/ShoppingList';

const ShoppingListForm = ({props}) => {
  const dispatch = useDispatch()
  const { id } = useSelector((state) => state.auth);
  const {sliQuantity} = props.shoppingListIngredient || 0
  const [newQuantity, setNewQuantity] = useState(sliQuantity)

  const handleQuantityChange = (e) => {
    setNewQuantity(e.target.value)
    dispatch(editListThunk(props.id, id, e.target.value))
  }
  const handleRemoveItem = () => {
    dispatch(editListThunk(props.id, id, 0))
  }

return (
    <>
    <tbody>
      <tr>
        <td>{props.name}</td>
        <td>Quantity: <input type="text" name="quantity" value={newQuantity}  onChange={(e) => handleQuantityChange(e)} /> </td>
        <td><button onClick={() => handleRemoveItem()}>X</button></td>
      </tr>
    </tbody>
    </>
)
}

export default ShoppingListForm
