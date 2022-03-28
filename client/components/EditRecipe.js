import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateRecipe } from '../store/recipes';
import { fetchSingleRecipe } from '../store/singleRecipe';
import { getFoods } from '../store/foods';

const EditRecipe = () => {
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

  const { userId, foods, singleRecipe } = useSelector((state) => {
    return {
      userId: state.auth.id,
      foods: state.foods,
      singleRecipe: state.singleRecipe,
    };
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchSingleRecipe(id));
    dispatch(getFoods(userId));
  }, []);

  useEffect(() => {
    setName(singleRecipe.name);
    setDescription(singleRecipe.description);
    setRating(singleRecipe.rating);
    setCuisineType(singleRecipe.cuisineType);
    setImage(singleRecipe.image);

    let singleRecipeIngredients = singleRecipe.ingredients || '';

    if (singleRecipeIngredients) {
      singleRecipeIngredients = singleRecipeIngredients.map((ingredient) => {
        return {
          name: ingredient.name,
          uom: ingredient.uom,
          recipeQty: ingredient.recipeIngredient.recipeQty,
        };
      });
    }

    setIngredients([...singleRecipeIngredients]);
  }, [singleRecipe]);

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
      updateRecipe(
        {
          id,
          name,
          description,
          rating,
          cuisineType,
          image,
          userId,
          ingredients,
        },
        history
      )
    );
  };

  return (
    <div>
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Recipe Name</label>
        <input
          name="name"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="rating">Rating</label>
        <select
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
        </select>

        <label htmlFor="cuisineType">Cuisine Type</label>
        <select
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
        </select>

        <label htmlFor="image">Image URL</label>
        <input
          name="image"
          value={image || ''}
          onChange={(e) => setImage(e.target.value)}
        />

        <br />
        <br />

        <div>
          <h4>Ingredients</h4>
          {ingredients.map((input, index) => {
            return (
              <div key={index}>
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  list="allFoods"
                  value={input.name || ''}
                  onChange={(e) => handleChange(index, e)}
                  autoComplete="on"
                />

                <datalist id="allFoods">
                  {foods.map((food) => (
                    <option key={food.id}>{food.name}</option>
                  ))}
                </datalist>

                <label htmlFor="uom">UOM</label>
                <input
                  type="text"
                  name="uom"
                  value={input.uom || ''}
                  onChange={(e) => handleChange(index, e)}
                />

                <label htmlFor="recipeQty">Qty</label>
                <input
                  type="number"
                  name="recipeQty"
                  value={input.recipeQty || ''}
                  onChange={(e) => handleChange(index, e)}
                />

                <button type="button" onClick={() => removeIngredient(index)}>
                  Remove
                </button>
              </div>
            );
          })}
          <br />
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>
        <button type="submit">Save</button>
        <button onClick={() => history.push(`/recipes/${id}`)}>Cancel</button>
      </form>
      <br />
      <br />
    </div>
  );
};

export default EditRecipe;
