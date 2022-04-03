import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSingleRecipe } from '../store/singleRecipe';
import { Link } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import { addRecToMyRecipes } from '../store/recipes';
import styles from './SingleRecipe.module.css';

const SingleRecipe = () => {
  const { singleRecipe, userId } = useSelector((state) => {
    return {
      singleRecipe: state.singleRecipe,
      userId: state.auth.id,
    };
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const ingredients = singleRecipe.ingredients || [];

  useEffect(() => {
    dispatch(fetchSingleRecipe(id));
  }, []);

  return (
    <Container className={styles.singleRecipeContainer}>
      <Card className={styles.recipeCard}>
        <Card.Img
          variant="top"
          className={styles.singleRecipeCardImg}
          src={singleRecipe.image}
        />
        <Card.Body>
          <Card.Title as="h1">{singleRecipe.name}</Card.Title>
          <Card.Text>
            <Container className={styles.typeRatingContainer}>
              <h6 className={styles.typeRatingInfo}>
                {singleRecipe.cuisineType}
              </h6>
              <h6 className={styles.typeRatingInfo}>|</h6>
              <h6 className={styles.typeRatingInfo}>
                {singleRecipe.rating} of 5 stars
              </h6>
            </Container>
            <Container className={styles.ingredientsContainer}>
              <h5>Ingredients</h5>
              <ul>
                {ingredients.map((ingredient) => {
                  return (
                    <li key={ingredient.id}>
                      <span>{ingredient.name} </span>
                      <span>{ingredient.recipeIngredient.recipeQty}</span>
                      <span>{ingredient.uom}</span>
                    </li>
                  );
                })}
              </ul>
            </Container>
            <Container className={styles.descriptionContainer}>
              <h5>Description</h5>
              <p>{singleRecipe.description}</p>
            </Container>
            <Container className={styles.nutritionalInfoContainer}>
              <h5>Nutritional Info</h5>
              <h6>
                <span>Carbs: {singleRecipe.carbsPerRecipe} </span>
                <span>Fat: {singleRecipe.fatPerRecipe} </span>
                <span>Protein: {singleRecipe.proteinPerRecipe} </span>
              </h6>
            </Container>
            <Button
              variant="primary"
              className={styles.button}
              onClick={() => history.push('/recipes')}
            >
              Back
            </Button>
            <Button
              variant="outline-primary"
              className={styles.buttonOutline}
              onClick={() => dispatch(addRecToMyRecipes(id, userId))}
            >
              Add to Shopping List
            </Button>
            <Link to={`/recipes/${id}/edit`}>
              <Button
                variant="outline-primary"
                className={styles.buttonOutline}
              >
                Edit
              </Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SingleRecipe;
