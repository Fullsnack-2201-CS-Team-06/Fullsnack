import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOnePantry } from '../store/pantry';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const PantrySingle = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const  pantry  = useSelector((state) => state.pantry);
  const { ingredients } = pantry || [];

  console.log("here's my pantry", pantry)


  useEffect(() => {
    dispatch(fetchOnePantry(match.params.id));
  }, []);

  /**
   *  Note to self, I have to grab item quantity from
   *  pantry ingredients.
   *
   *
   */

  return (
    <div className='PantrySingle'>
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
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.pantryIngredient.pantryQty}</td>
                    <td>{item.pantryIngredient.cost}</td>
                    <td>{item.uom}</td>
                    <td>
                      <Button>x</Button>
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
