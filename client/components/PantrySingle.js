import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { fetchOnePantry } from '../store/pantry';

const PantrySingle = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const pantry = useSelector((state) => state.pantry);
  const { ingredients } = pantry || []

  // console.log("What's on my state", pantry.ingredients);
  console.log("What's my pantry look like", pantry)
  console.log("What's my ingredients look like", ingredients)

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
        <Table bordered variant='dark'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Cost/Item</th>
              <th>Measurer</th>
              <th>x</th>
            </tr>
          </thead>
          <tbody>
            {ingredients ? (
              ingredients.map((item) => { 
                return <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>2</td>
                  <td>{item.cost}</td>
                  <td>{item.uom}</td>
                </tr>;
              })
            ) : (
              <tr><td>Nothing to see here.</td></tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default PantrySingle;
