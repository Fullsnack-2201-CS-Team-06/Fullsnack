import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSingleRecipe } from '../store/singleRecipe';
import { Link } from 'react-router-dom';

const SingleRecipe = () => {
  const { singleRecipe } = useSelector((state) => {
    return {
      singleRecipe: state.singleRecipe,
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
    <div>
      <h1>{singleRecipe.name}</h1>
      <h3>{singleRecipe.cuisineType}</h3>
      <h5>{singleRecipe.rating} of 5 stars</h5>
      <img src={singleRecipe.image} style={{ height: '400px' }} />
      <br />
      <br />
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
      <h5>Description</h5>
      <p>{singleRecipe.description}</p>
      <h5>Nutritional Info</h5>
      <h6>
        <span>Carbs: {singleRecipe.carbsPerRecipe} </span>
        <span>Fat: {singleRecipe.fatPerRecipe} </span>
        <span>Protein: {singleRecipe.proteinPerRecipe} </span>
      </h6>
      <button onClick={() => history.push('/recipes')}>Back</button>
      <Link>
        <button to={`/recipes/${id}/edit`}>Edit</button>
      </Link>
    </div>
  );
};

export default SingleRecipe;
