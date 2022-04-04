import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCurrentShoppingList, sendToPantry } from '../store/ShoppingList';
import { fetchAllPantries, createNewPantry } from '../store/pantries';
import { fetchSinglePantry } from '../store/pantry';
import ShoppingListForm from './ShoppingListForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Table, Button, Container, Form } from 'react-bootstrap';
import styles from './ShoppingList.module.css';

const ShoppingList = () => {
  const { id } = useSelector((state) => state.auth);
  const { shoppingList, pantries } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { currentList } = shoppingList;
  const defaultName = pantries[0] || 'dave';
  const [selectedPantry, setSelectedPantry] = useState(defaultName);
  const [newPantry, setNewPantry] = useState('');
  const { name } = currentList || '';
  const { ingredients } = currentList || [];
  const didMount = useRef(false);

  useEffect(() => {
    if (selectedPantry === 'dave' && pantries.length) {
      setSelectedPantry(pantries[0].id);
      dispatch(fetchSinglePantry(pantries[0].id));
      didMount.current = true;
    } else if (didMount.current && pantries.length) {
      setSelectedPantry(pantries[pantries.length - 1].id);
    }
  }, [pantries]);

  useEffect(() => {
    dispatch(fetchCurrentShoppingList(id));
    dispatch(fetchAllPantries(id));
  }, []);
  let otherPantries = [];
  let length = 0;
  if (ingredients) {
    length = ingredients.length;
  }
  if (pantries.length > 1) {
    otherPantries = pantries.slice(1);
  }

  async function handleCreatePantry() {
    dispatch(createNewPantry([{ name: newPantry }], id));
  }

  async function handleSubmit() {
    if (typeof selectedPantry === 'string' && ingredients.length) {
      dispatch(sendToPantry(id, currentList, selectedPantry));
      dispatch(fetchSinglePantry(selectedPantry));
    } else if (ingredients.length) {
      dispatch(sendToPantry(id, currentList, pantries[0].id));
      dispatch(fetchSinglePantry(selectedPantry));
    } else {
      window.alert('There are no items to add to your pantry!');
    }
  }

  console.log('Ingredients: ', ingredients);

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Shopping List</h1>
      </div>
      <Container className={styles.shoppingListContainer}>
        <div className={styles.margin}>
          <div className={styles.shopNav}>
            <Link to={'/list/history'}>
              <Button
                variant="outline-primary"
                className={styles.buttonOutline}
              >
                Shopping History
              </Button>
            </Link>
          </div>
          <div>
            {ingredients && ingredients.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className={styles.enlarge}>List Item</th>
                    <th className={styles.enlarge}>Quantity</th>
                    <th className={styles.enlarge}>Remove from list</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients.map((item) => {
                    return <ShoppingListForm key={item.id} props={item} />;
                  })}
                </tbody>
              </Table>
            ) : (
              <div className={styles.tableNoIngredients}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className={styles.enlarge}>List Item</th>
                      <th className={styles.enlarge}>Quantity</th>
                      <th className={styles.enlarge}>Remove from list</th>
                    </tr>
                  </thead>
                </Table>
                <h4>No items on shopping list.</h4>
              </div>
            )}
          </div>
          <div className={styles.addToPantry}>
            <Form.Select
              name="pantries"
              className={styles.select}
              style={{ width: '200px' }}
              value={selectedPantry}
              onChange={(e) => setSelectedPantry(e.target.value)}
            >
              <option value="1">{defaultName.name}</option>
              {otherPantries.length ? (
                otherPantries.map((pantry) => (
                  <option key={pantry.id} value={pantry.id}>
                    {pantry.name}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Form.Select>
            <div>
              {/* <div className={styles.enlarge} > */}
              <Button
                className={styles.button}
                variant="primary"
                onClick={() => handleSubmit()}
              >
                Add items to Pantry
              </Button>
              {/* </div> */}
              <p>Total # of unique items: {length}</p>
            </div>
            <div className={styles.enlarge}>
              <form method="GET" id="my_form">
                <Form.Control
                  style={{ width: '300px' }}
                  className={styles.newPantry}
                  type="text"
                  placeholder="New pantry name"
                  name="name"
                  value={newPantry}
                  onChange={(e) => setNewPantry(e.target.value)}
                />
                <div>
                  <Button
                    className={styles.button}
                    variant="primary"
                    onClick={() => handleCreatePantry()}
                  >
                    Create New Pantry
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShoppingList;
