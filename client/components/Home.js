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
    <div className={styles.container}>
      <h3>Welcome, {username}</h3>
      <div className={styles.charts}>
        <Card className={styles.chartCard}>
          <Card.Body>
            <VisualNutrition />
          </Card.Body>
        </Card>
        <Card className={styles.chartCard}>
          <Card.Body>
            <Visuals />
          </Card.Body>
        </Card>
        <Visual2 />
      </div>
    </div>
  );
};

export default Home;
