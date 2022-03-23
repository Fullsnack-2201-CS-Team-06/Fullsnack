import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllPantries } from '../store/pantries';

const Pantries = () => {
  const { id } = useSelector((state) => state.auth);
  const { pantries } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPantries(id));
  }, []);

  return (
    <div>
      <h3>My Pantry</h3>
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
