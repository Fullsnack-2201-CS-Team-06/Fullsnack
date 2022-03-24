import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showRecRecipes } from '../store/recRecipes';
import styles from './RecRecipes.module.css';
import { Card, Button, Accordion } from 'react-bootstrap';

/* OBJECTIVE: Show a number of recipes as recommendations to the user. For now, search all the recipes that are not already associated with the user. Sort those such that the top results show recipes that require the least number of new ingredients. When we implement the API, we can obtain either the full list of rec recipes from there, or we could use the api to fill in a deficit of results once we filter the user's preferences.*/

const RecRecipes = () => {
  const { id } = useSelector((state) => state.auth);
  const { recRecipes } = useSelector((state) => state);
  const dispatch = useDispatch();

  //Get all the recommended recipes not associated with the current user.
  useEffect(() => {
    dispatch(showRecRecipes());
  }, []);

  console.log('recRecipes: ', recRecipes);

  return (
    <div className={styles.container}>
      <h1>Recommended Recipes</h1>
      <div className={styles.recRecipes}>
        {recRecipes.map((recipe, i) => (
          <Accordion key={i}>
            <Card key={i} className={styles.recRecipeCard}>
              <Card.Img variant="top" src={recipe.image} />
              <Card.Title>{recipe.name}</Card.Title>
              <Button variant="primary">Add to My Recipes</Button>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Read More</Accordion.Header>
                <Accordion.Body>MORE DETAILS</Accordion.Body>
              </Accordion.Item>
            </Card>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default RecRecipes;
