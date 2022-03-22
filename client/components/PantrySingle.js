import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { fetchOnePantry } from '../store/pantry'

const PantrySingle = () => {
  const dispatch = useDispatch()
  const { id } = useSelector((state) => state.auth);
  // const { pantry } = useSelector((state) => state);
  const params = useParams();

  console.log("What are my params", params)
  // console.log("What is my state", state)

  useEffect(() => {
    console.log("OUR USE EFFECT HOOK FIRED.")
    dispatch(fetchOnePantry(params))
  }, [])

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
        </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default PantrySingle;
