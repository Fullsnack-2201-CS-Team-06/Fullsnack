import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { fetchOnePantry } from '../store/pantry';

const PantrySingle = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { pantry } = useSelector((state) => state);

  console.log("What's on my state", pantry.ingredients);
  // console.log("What's in my map", data)

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
            {pantry > 0 ? (
              pantry.ingredients.map((ingredient) => { return
                <tr>
                  <td>{ingredient.name}</td>
                  <td>{Placeholder}</td>
                  <td>{ingredient.cost}</td>
                  <td>{ingredient.uom}</td>
                </tr>;
              })
            ) : (
              <td>Nothing to see here.</td>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default PantrySingle;
