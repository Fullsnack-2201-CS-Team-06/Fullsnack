import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCurrentShoppingList, sendToPantry } from '../store/ShoppingList';
import { fetchAllPantries, createNewPantry } from '../store/pantries'
import ShoppingListForm from './ShoppingListForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Table, Button, Container, Form } from 'react-bootstrap'
import styles from './ShoppingList.module.css'

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
    <Container >
  <div  >
    <div className={styles.shopNav} >
      <h4 className={styles.title} >Shopping List:</h4>
      <h4 className={styles.title} >{name}</h4>
      <Link to={'/list/history'} >View History</Link>
    </div>
    <div >
        { ingredients ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className={styles.enlarge} >List Item</th>
                <th className={styles.enlarge} >Quantity</th>
                <th className={styles.enlarge} >Remove from list</th>
              </tr>
            </thead>
            <tbody>
         { ingredients.map(item => {
          return (
            <ShoppingListForm key={item.id} props={item} />
          )
        }) }
        </tbody>
      </Table> )
        :
        <></>
      }
    </div>
    <div className={styles.addToPantry} >
    <Form.Select name="pantries" className={styles.select} style={{width:'200px'}} onChange={(e) => setSelectedPantry(e.target.value)} >
        <option value="1">{defaultName.name}</option>
        { otherPantries.length ?
        otherPantries.map((pantry) => (
          <option key={pantry.id} value={pantry.id}>
            {pantry.name}
          </option>
        )) :
        <></>
        }
      </Form.Select>
      <div>
        {/* <div className={styles.enlarge} > */}
      <Button className={styles.button} variant="primary" onClick={() => handleSubmit()}>Add items to Pantry</Button>
        {/* </div> */}
      <p>Total # of unique items: {length}</p>
      </div>
      <div className={styles.enlarge} >
      <form method="GET" id="my_form">
        <Form.Control style={{width:'300px'}} className={styles.newPantry} type='text' placeholder='New pantry name' name='name' value={newPantry} onChange={(e) => setNewPantry(e.target.value)} />
        <div>
        <Button className={styles.button} variant="primary" onClick={() => handleCreatePantry()}>Create New Pantry</Button>
        </div>
      </form>
      </div>
    </div>
  </div>
  </Container>
  );
};

export default ShoppingList;
