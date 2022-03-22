import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const PantrySingle = () => {
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
