import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VictoryBar } from 'victory';
import { fetchAllPantries } from '../store/pantries';
import Visuals from './Visuals';
import Visual2 from './Visual2';
import VisualNutrition from './VisualNutrition';
import styles from './Home.module.css';
import { Card } from 'react-bootstrap';

/**
 * COMPONENT
 */
const Home = (props) => {
  const { username, id } = useSelector((state) => state.auth);

  const { pantries } = useSelector((state) => state.pantries);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPantries(id));
  }, []);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Card className={styles.chartCard}>
        <Card.Body>
          <VisualNutrition />
        </Card.Body>
      </Card>
      <Visuals />
      <Visual2 />
    </div>
  );
};

export default Home;
