import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VictoryBar } from 'victory';
import { fetchAllPantries } from '../store/pantries';
import Visuals from './Visuals';
import Visual2 from './Visual2';
import VisualNutrition from './VisualNutrition';
import VisualIngredientLineGraph from './VisualIngredientLineGraph';
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
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Overview</h1>
      </div>
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
        <Card className={styles.chartCard}>
          <Card.Body>
            <Visual2 />
          </Card.Body>
        </Card>
        <Card className={styles.chartCard}>
          <Card.Body>
            <VisualIngredientLineGraph />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
