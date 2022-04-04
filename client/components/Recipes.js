import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllRecipes, deleteRecipe } from '../store/recipes';
import { Link, useHistory } from 'react-router-dom';
import RecRecipes from './RecRecipes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Carousel } from 'react-bootstrap';
import styles from './Recipes.module.css';

const Recipes = () => {
  const history = useHistory();
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
    <div className={styles.recipesPage}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Recipes</h1>
      </div>
      <h3
        style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
      >
        Recommended
      </h3>
      <Container className={styles.carouselContainer}>
        <RecRecipes />
      </Container>
      <Container className={styles.allRecipesContainer}>
        <h3
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          My Recipes
        </h3>
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
                  <Card.Text>
                    {recipe.rating ? `${recipe.rating} of 5 stars` : ''}
                  </Card.Text>
                  <Link to={`/recipes/${recipe.id}`}>
                    <Button
                      variant="outline-primary"
                      className={styles.buttonOutline}
                    >
                      View
                    </Button>
                  </Link>
                  <Button
                    variant="outline-primary"
                    className={styles.buttonOutline}
                    onClick={() => dispatch(deleteRecipe(recipe.id))}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      </Container>
    </div>
  );
};

export default Recipes;
