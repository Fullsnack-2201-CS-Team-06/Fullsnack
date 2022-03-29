import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPantries } from '../store/pantries';
import { fetchSinglePantry } from '../store/pantry'

import PantrySingle from './PantrySingle'

import NewPantryItem from './NewPantryItem';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const PantryRefactor = () => {
  const { id } = useSelector((state) => state.auth);
  const { pantries } = useSelector((state) => state);
  const  pantry  = useSelector((state) => state.pantry);
  const [selectedPantry, setSelectedPantry] = useState(0);
  const { ingredients } = pantry || [];


  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAllPantries(id));
  }, []);

  const handlePantryChange = (e) => { 
    setSelectedPantry(e);
    dispatch(fetchSinglePantry(e))
  };

  return (
    <div>
    <select name='pantries' onChange={(e) => handlePantryChange(e.target.value)}>
      {pantries.map((pantry) => (
        <option key={pantry.id} value={pantry.id}>
          {pantry.name}
        </option>
      ))}
    </select>
    <PantrySingle/>
  </div>
  );
};

export default PantryRefactor;
