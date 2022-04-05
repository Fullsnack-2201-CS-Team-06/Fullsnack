import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editListThunk } from '../store/ShoppingList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Table, Button, Form } from 'react-bootstrap';
import styles from './ShoppingList.module.css';

const ShoppingListForm = ({ props }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { sliQuantity } = props.shoppingListIngredient || 0;
  const [newQuantity, setNewQuantity] = useState(sliQuantity);

  const handleQuantityChange = (e) => {
    setNewQuantity(e.target.value);
    dispatch(editListThunk(props.id, id, e.target.value));
  };
  const handleRemoveItem = () => {
    dispatch(editListThunk(props.id, id, 0));
  };

  // style={{width:'200px'}}

  return (
    <>
      <tr>
        <td className={styles.enlarge}>{props.name}</td>
        <td>
          <Form.Control
            type="text"
            name="quantity"
            value={newQuantity}
            onChange={(e) => handleQuantityChange(e)}
          />
        </td>
        <td className={styles.enlarge}>
          <Button
            className={styles.removebutton}
            onClick={() => handleRemoveItem()}
          >
            x
          </Button>
        </td>
      </tr>
    </>
  );
};

export default ShoppingListForm;
