import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchOnePantry, editPantryThunk } from '../store/pantry';

// import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';


const PantrySingle = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const  pantry  = useSelector((state) => state.pantry);
  const { ingredients } = pantry || [];

  useEffect(() => {
    dispatch(fetchOnePantry(match.params.id));
  }, []);

  async function handleChange(itemId, userId, quantity){
    dispatch(editPantryThunk(itemId, userId, quantity))
  }

  return (
    <div className='PantrySingle'>
      <Link to='/pantries/add'>
    <button>Add Item</button>
    </Link>
      <Container>
        <Table striped>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Cost/Item</th>
              <th>Measurer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ingredients ? (
              ingredients.map((item) => {
                const quantity = item.pantryIngredient.pantryQty
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td><Button onClick={() => handleChange(item.id, id, quantity-1)}>-</Button> {quantity} 
                    <Button onClick={() => handleChange(item.id, id, quantity+1)}>+</Button></td> 
                    <td>{item.pantryIngredient.cost}</td>
                    <td>{item.uom}</td>
                    <td>
                      <Button onClick={() => handleChange(item.id, id, 0)}>x</Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Nothing to see here.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default PantrySingle;
