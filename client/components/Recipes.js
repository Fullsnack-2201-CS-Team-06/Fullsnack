import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllRecipes } from '../store/recipes';
import { Link } from 'react-router-dom';
import RecRecipes from './RecRecipes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button } from 'react-bootstrap';
import styles from './Recipes.module.css';

const Recipes = () => {
  const { recipes, auth } = useSelector((state) => {
    return {
      recipes: state.recipes,
      auth: state.auth,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRecipes(auth.id));
  }, []);

  return (
    <Container className={styles.recipesPage}>
      <Container>
        <RecRecipes />
      </Container>
      <Container className={styles.allRecipesContainer}>
        <Container className={styles.recipesHeader}>
          <h1>My Recipes</h1>
        </Container>
        <Container className={styles.addRecipeBtnContainer}>
          <Link to="/recipes/add">
            <Button variant="primary" className={styles.button}>
              Add Recipe
            </Button>
          </Link>
        </Container>
        <Container className={styles.recipeCardContainer}>
          {recipes.map((recipe) => {
            return (
              <Card className={styles.recipeCard} key={recipe.id}>
                <Card.Img
                  variant="top"
                  className={styles.recipeImg}
                  src={recipe.image}
                  style={{ height: '200px' }}
                />
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Text>{recipe.rating} of 5 stars</Card.Text>
                  <Link to={`/recipes/${recipe.id}`}>
                    <Button
                      variant="outline-primary"
                      className={styles.buttonOutline}
                    >
                      View
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      </Container>
    </Container>
  );
};

export default Recipes;
