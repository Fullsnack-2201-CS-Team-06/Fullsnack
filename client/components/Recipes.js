import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllRecipes } from '../store/recipes';

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
    <div>
      <div>
        <h1>My Recipes</h1>
      </div>
      <div>
        {recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <h3>{recipe.name}</h3>
              <img src={recipe.image} style={{ height: '200px' }} />
              <br />
              <br />
              {recipe.ingredients.map((ingredient) => {
                return (
                  <div key={ingredient.id}>
                    <span>{ingredient.name} </span>
                    <span>{ingredient.recipeIngredient.recipeQty}</span>
                    <span>{ingredient.uom}</span>
                  </div>
                );
              })}
              <p>{recipe.description}</p>
              <h5>{recipe.rating} of 5 stars</h5>
            </div>
          );
        })}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Recipes;
