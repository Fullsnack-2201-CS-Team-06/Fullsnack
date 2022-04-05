import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNewRecipe } from '../store/recipes';
import { getFoods } from '../store/foods';
import { Container, Button, Form, Card } from 'react-bootstrap';
import styles from './AddRecipe.module.css';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState([
    {
      name: '',
      uom: '',
      recipeQty: '',
    },
  ]);

  const { userId, foods } = useSelector((state) => {
    return {
      userId: state.auth.id,
      foods: state.foods,
    };
  });

  useEffect(() => {
    dispatch(getFoods(userId));
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const addIngredient = () => {
    let newIngredient = {
      name: '',
      uom: '',
      recipeQty: '',
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (index) => {
    let data = [...ingredients];
    data.splice(index, 1);
    setIngredients(data);
  };

  const handleChange = (index, e) => {
    let data = [...ingredients];
    data[index][e.target.name] = e.target.value;
    setIngredients(data);

    // If ingredient name === an existing food name, set UOM
    if (e.target.name === 'name') {
      // The following only runs if 'name' field changes
      const foodNames = foods.map((food) => food.name);
      if (foodNames.includes(e.target.value)) {
        // The following only runs if 'name' field is included in food names
        const existingFood = foods.filter(
          (food) => food.name === e.target.value
        );
        const existingUOM = existingFood[0]['uom'];
        data[index]['uom'] = existingUOM;
        setIngredients(data);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewRecipe({
        name,
        description,
        rating,
        cuisineType,
        image: image.length ? image : null,
        userId,
        ingredients,
      })
    );
    history.push('/recipes');
  };

  return (
    <Container className={styles.addRecipeContainer}>
      <Card className={styles.addRecipeCard}>
        <Card.Img
          variant="top"
          className={styles.addRecipeImg}
          src="https://envato-shoebox-0.imgix.net/7207/244b-7205-498a-ac42-be724c0cc864/Grilled+meat_1_banner.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=1600&s=0733ee80d4d4d56268984666018bd1e5"
        />
        <Card.Body>
          <Card.Title as="h1">Add Recipe</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Container className={styles.recipeInfo}>
              <Form.Group>
                <Form.Label htmlFor="name">Recipe Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  name="description"
                  value={description || ''}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="rating">Rating</Form.Label>
                <Form.Select
                  name="rating"
                  value={rating || ''}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Rating
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="cuisineType">Cuisine Type</Form.Label>
                <Form.Select
                  name="cuisineType"
                  value={cuisineType || ''}
                  onChange={(e) => setCuisineType(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Cuisine Type
                  </option>
                  <option value="American">American</option>
                  <option value="Asian">Asian</option>
                  <option value="British">British</option>
                  <option value="Caribbean">Caribbean</option>
                  <option value="Central Europe">Central Europe</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Eastern Europe">Eastern Europe</option>
                  <option value="French">French</option>
                  <option value="Indian">Indian</option>
                  <option value="Italian">Italian</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Kosher">Kosher</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Middle Eastern">Middle Eastern</option>
                  <option value="Nordic">Nordic</option>
                  <option value="South American">South American</option>
                  <option value="South East Asian">South East Asian</option>
                  <option value="None">None</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="image">Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={image || ''}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Form.Group>
            </Container>
            <Container>
              <h4>Ingredients</h4>
              {ingredients.map((input, index) => {
                return (
                  <Container className={styles.ingredientRows} key={index}>
                    <Form.Group>
                      <Form.Label htmlFor="name">Name</Form.Label>
                      <Form.Control
                        name="name"
                        list="allFoods"
                        type="text"
                        value={input.name || ''}
                        onChange={(e) => handleChange(index, e)}
                        autoComplete="on"
                      />
                      <datalist id="allFoods">
                        {foods.map((food) => (
                          <option key={food.id}>{food.name}</option>
                        ))}
                      </datalist>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label htmlFor="uom">UOM</Form.Label>
                      <Form.Control
                        type="text"
                        name="uom"
                        value={input.uom || ''}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label htmlFor="recipeQty">Qty</Form.Label>
                      <Form.Control
                        type="number"
                        name="recipeQty"
                        value={input.recipeQty || ''}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </Form.Group>

                    <Button
                      type="button"
                      variant="outline-primary"
                      className={styles.removeIngredientBtn}
                      onClick={() => removeIngredient(index)}
                    >
                      Remove
                    </Button>
                  </Container>
                );
              })}
              <Container className={styles.addIngredientBtnContainer}>
                <Button
                  variant="primary"
                  className={styles.button}
                  type="button"
                  onClick={addIngredient}
                >
                  Add Ingredient
                </Button>
              </Container>
            </Container>
            <Container className={styles.formBtnsContainer}>
              <Button variant="primary" className={styles.button} type="submit">
                Save
              </Button>
              <Button
                type="button"
                variant="outline-primary"
                className={styles.buttonOutline}
                onClick={() => history.push('/recipes')}
              >
                Cancel
              </Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddRecipe;
