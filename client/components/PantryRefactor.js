import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPantries } from '../store/pantries';
import { fetchSinglePantry } from '../store/pantry';
import styles from './PantryRefactor.module.css';
import PantrySingle from './PantrySingle';
import NewPantryItem from './NewPantryItem';
import PantryCreate from './PantryCreate';

/* This page contains all the components for the Pantry tab.
It also has the filter to switch between a users pantries. */

const PantryRefactor = () => {
  const { id } = useSelector((state) => state.auth);
  const { pantries } = useSelector((state) => state);
  const pantry = useSelector((state) => state.pantry);
  const [selectedPantry, setSelectedPantry] = useState(0);
  const { ingredients } = pantry || [];

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAllPantries(id));
  }, []);

  useEffect(() => {
    //If we navigate to the pantry page for the first time, view the Home pantry.
    //If the store does not already have a pantry set, set the home pantry.
    console.log("second use effect ran")
    if (!Object.keys(pantry).length && pantries.length) {
      const homePantry = pantries.filter((pantry) => pantry.name === 'Home')[0];
      dispatch(fetchSinglePantry(homePantry.id));
    }
  }, [pantries]);


  const handlePantryChange = (e) => {
    setSelectedPantry(e);
    dispatch(fetchSinglePantry(e));
  };

  return (
    <div>
      <div className={styles.pantryFilterContainer}>
        <div className={styles.pantryFilterBox}>
          <div className={styles.pantryFilter}>
            <label className={styles.label}>My Pantries:</label>
            <br></br>
            <select
              name='pantries'
              onChange={(e) => handlePantryChange(e.target.value)}
            >
              {pantries.map((pantry) => (
                <option key={pantry.id} value={pantry.id}>
                  {pantry.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {Object.keys(pantry) ? (
         <PantrySingle pantry={pantry} />
      ) : (
        <div>Nothing here.</div>
      )}
      <PantryCreate />
      <NewPantryItem />
    </div>
  );
};

export default PantryRefactor;
