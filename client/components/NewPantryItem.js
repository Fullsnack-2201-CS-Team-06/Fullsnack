import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addPantryItemThunk } from '../store/pantry';
import { getFoods } from '../store/foods';
import { Form, Container, Button, Card } from 'react-bootstrap';
import styles from './NewPantryItem.module.css';

const NewPantryItem = () => {
  const { userId, id, foods } = useSelector((state) => {
    return {
      userId: state.auth.id,
      id: state.pantry.id,
      foods: state.foods,
    };
  });

  const [inputFields, setInputFields] = useState([
    {
      name: '',
      category: '',
      quantity: '',
      cost: '',
      measure: '',
    },
  ]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getFoods());
  }, []);

  const handleChange = (index, e) => {
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);

    if (e.target.name === 'name') {
      const foodNames = foods.map((food) => food.name);
      if (foodNames.includes(e.target.value)) {
        const existingFood = foods.filter(
          (food) => food.name === e.target.value
        );
        const existingUOM = existingFood[0]['uom'];
        data[index]['uom'] = existingUOM;
        setInputFields(data);
      }
    }
  };

  const addFields = () => {
    let newField = {
      name: '',
      category: '',
      quantity: '',
      cost: '',
      measure: '',
    };
    setInputFields([...inputFields, newField]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let filteredInputs = inputFields.filter((foodItem) => {
      if (
        foodItem.name.length &&
        foodItem.category.length &&
        foodItem.quantity.length
      ) {
        return foodItem;
      }
    }, []);

    setInputFields(filteredInputs);

    if (filteredInputs.length) {
      dispatch(
        addPantryItemThunk({
          id,
          inputFields,
        })
      );
    } else {
      window.alert('Please fill out the forms');
    }
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
          <Card.Title as="h1">Add Pantry Items</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Container>
              {inputFields.map((input, index) => {
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
                      <Form.Label htmlFor="category">Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={input.category || ''}
                        onChange={(e) => handleChange(index, e)}
                      >
                        <option value="" disabled selected>
                          Select Category
                        </option>
                        <option value="produce">Produce</option>
                        <option value="meat">Meat</option>
                        <option value="dairy">Dairy</option>
                        <option value="dry goods">Dry Goods</option>
                        <option value="bakery">Baked Goods</option>
                        <option value="beverages">Beverages</option>
                        <option value="miscellaneous">Miscellaneous</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label htmlFor="recipeQty">Qty</Form.Label>
                      <Form.Control
                        type="number"
                        name="quantity"
                        value={input.quantity || ''}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </Form.Group>

                    <Button
                      type="button"
                      variant="outline-primary"
                      className={styles.removeIngredientBtn}
                      onClick={() => removeFields(index)}
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
                  onClick={addFields}
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
                onClick={() => history.push('/pantries')}
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

export default NewPantryItem;
