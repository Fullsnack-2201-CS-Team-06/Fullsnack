import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllPantries } from '../store/pantries';



const Pantries = () => {

  const { username, id } = useSelector(state => state.auth)
  const { pantries } = useSelector(state => state)
  //Ask about state.pantries versus state

  const dispatch = useDispatch();
  console.log("What's on my state", pantries, pantries.length)

  useEffect(() => {
    dispatch(fetchAllPantries(id))
  }, [])


  return (<div>
  <h3>My Pantry</h3>
  {pantries.length ? (pantries.map((pantry) => {
  <Link key={pantry.id} to ="/">{pantry.name}</Link>
  }))
: (
  <div>Nothing to show</div>
)
}</div>);
};

export default Pantries;
