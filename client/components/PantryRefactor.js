import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPantries } from '../store/pantries';
import { fetchSinglePantry } from '../store/pantry';
import styles from './PantryRefactor.module.css';
import PantrySingle from './PantrySingle';
import NewPantryItem from './NewPantryItem';
import PantryCreate from './PantryCreate';
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* This page contains all the components for the Pantry tab.
It also has the filter to switch between a users pantries. */

const PantryRefactor = () => {
  const { id } = useSelector((state) => state.auth);
  const { pantries } = useSelector((state) => state);
  const pantry = useSelector((state) => state.pantry);
  const [selectedPantry, setSelectedPantry] = useState(pantry ? pantry.id : 0);
  const { ingredients } = pantry || [];
  const [hidden, setHidden] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPantries(id));
    dispatch(fetchSinglePantry(pantry.id));
  }, []);

  useEffect(() => {
    //If we navigate to the pantry page for the first time, view the Home pantry.
    //If the store does not already have a pantry set, set the home pantry.

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
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Pantry</h1>
      </div>
      <Container>
        <div className={styles.pantryFilterContainer}>
          <div className={styles.buttonGroup}>
            <Link to="/pantries/add">
              <Button className={styles.button} variant="primary">
                Add Items
              </Button>
            </Link>
            {hidden ? (
              <Button
                className={styles.buttonOutline}
                variant="outline-primary"
                onClick={() => setHidden(false)}
              >
                Create New Pantry
              </Button>
            ) : (
              <div style={{ display: 'inline' }}>
                <PantryCreate />
                <Button
                  className={styles.buttonLink}
                  variant="link"
                  onClick={() => setHidden(true)}
                >
                  Hide
                </Button>
              </div>
            )}
          </div>
          <div className={styles.pantryFilterBox}>
            <div>
              <Form.Label className={styles.label}>Select Pantry</Form.Label>
              <Form.Select
                name="pantries"
                onChange={(e) => handlePantryChange(e.target.value)}
                value={selectedPantry}
              >
                {pantries.map((pantry) => (
                  <option key={pantry.id} value={pantry.id}>
                    {pantry.name}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
        </div>
      </Container>
      {Object.keys(pantry) ? <PantrySingle /> : <div>Nothing here.</div>}
    </div>
  );
};

export default PantryRefactor;
