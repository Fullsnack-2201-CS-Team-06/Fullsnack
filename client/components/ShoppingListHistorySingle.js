import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button } from 'react-bootstrap';
import { setSingleHistoryView, editListThunk } from '../store/ShoppingList';
import styles from './ShoppingList.module.css';

const ShoppingListHistorySingle = ({ match }) => {
  const { id } = useSelector((state) => state.auth);
  const { shoppingList } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { singleHistory } = shoppingList;
  const history = useHistory();

  useEffect(() => {
    dispatch(setSingleHistoryView(match.params.listId));
  }, []);

  const { name } = singleHistory || '';
  const { ingredients } = singleHistory || [];
  let length = 0;
  if (ingredients) length = ingredients.length;

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Shopping List</h1>
      </div>
      <Container className={styles.margin}>
        <div>
          <h4 className={styles.title}>Shopping List: {name}</h4>
          <Link
            to={'/list/history'}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              textDecoration: 'none',
              marginBottom: '5px',
            }}
          >
            <Button variant="outline-primary" className={styles.buttonOutline}>
              Back to History
            </Button>
          </Link>
          <Table striped bordered>
            <thead>
              <tr>
                <td className={styles.enlarge}>List Items</td>
                <td className={styles.enlarge}>Quantity</td>
              </tr>
            </thead>
            <tbody>
              {ingredients ? (
                ingredients.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className={styles.enlarge}>{item.name}</td>
                      <td className={styles.enlarge}>
                        {item.shoppingListIngredient.sliQuantity}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr></tr>
              )}
            </tbody>
          </Table>
          <div className={styles.itemCount}>
            <h5>Unique Items: {length}</h5>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShoppingListHistorySingle;
