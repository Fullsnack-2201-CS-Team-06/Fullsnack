import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleRecipe } from '../store/singleRecipe';

const SingleRecipe = () => {
  const { singleRecipe } = useSelector((state) => {
    return {
      singleRecipe: state.singleRecipe,
    };
  });

  const dispatch = useDispatch();
  const { id } = useParams();

  const ingredients = singleRecipe.ingredients || []

  useEffect(() => {
    dispatch(fetchSingleRecipe(id));
  }, []);

  return (
    <div>
      <h1>{singleRecipe.name}</h1>
      <img src={singleRecipe.image} style={{ height: '400px' }} />
      <br />
      {ingredients.map((ingredient) => {
        return (
          <div key={ingredient.id}>
            <span>{ingredient.name} </span>
            <span>{ingredient.recipeIngredient.recipeQty}</span>
            <span>{ingredient.uom}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SingleRecipe;
