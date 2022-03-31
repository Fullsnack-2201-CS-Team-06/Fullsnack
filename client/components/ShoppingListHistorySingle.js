import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table } from 'react-bootstrap'
import { setSingleHistoryView, editListThunk } from '../store/ShoppingList';
import styles from './ShoppingList.module.css'

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
    <Container className={styles.margin} >
  <div  >
   <h4 className={styles.title} >Shopping List: {name}</h4>
   <p className={styles.backToHistory} ><Link to={'/list/history'} >Back to History</Link></p>
<Table>
  <tbody>
  <tr>
    <td className={styles.enlarge} >List Items</td>
    <td className={styles.enlarge} >Quantity</td>
  </tr>
  { ingredients ?
  ingredients.map(item => {
    return (
      <tr key={item.id}>
        <td className={styles.enlarge} >{item.name}</td>
        <td className={styles.enlarge} >{item.shoppingListIngredient.sliQuantity}</td>
      </tr>
    )
  }):
  <tr></tr>
  }
  </tbody>
</Table>
    <div>
      <h6 className={styles.title} >Total # of unique items: {length}</h6>
    </div>
  </div>
  </Container>
  );
};

export default ShoppingListHistorySingle;
