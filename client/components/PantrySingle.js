import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { fetchOnePantry } from '../store/pantry';

const PantrySingle = ( { match }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  // const { pantry } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchOnePantry(match.params.id));
  }, []);

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
            {/* {singlePantry.map((ingredient) => {
              <tr>
                <td>{ingredient.name}</td>
                <td>{Placeholder}</td>
                <td>{ingredient.cost}</td>
                <td>{ingredient.uom}</td>
              </tr>;
            })} */}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default PantrySingle;
