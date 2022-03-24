import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllPantries } from '../store/pantries';
import Button from 'react-bootstrap/Button';

const Pantries = () => {
  const { id } = useSelector((state) => state.auth);
  const { pantries } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPantries(id));
  }, []);

  return (
    <div>
      <h2>My Pantry</h2>
      {/* Note to self, don't forget to rename this button. */}
      <Button>Spawn New Pantry</Button>
      {pantries.length > 0 ? (
        pantries.map((pantry) => {
         return <li key={pantry.id}><Link to={`/pantries/${pantry.id}`}>{pantry.name}</Link></li>
        ;
        })
      ) : (
        <div>Nothing to show</div>
      )}
    </div>
  );
};

export default Pantries;
