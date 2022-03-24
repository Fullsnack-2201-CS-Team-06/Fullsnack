import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllRecipes } from '../store/recipes';
import { Link } from 'react-router-dom';
import RecRecipes from './RecRecipes';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="recipesPage">
      <RecRecipes />
      <div className="allRecipesContainer">
        <div className="recipesHeader">
          <h1>My Recipes</h1>
        </div>
        <div className="addRecipeBtnContainer">
          <Link to="/recipes/add">
            <button>Add Recipe</button>
          </Link>
        </div>
        <div className="recipeCardContainer">
          {recipes.map((recipe) => {
            return (
              <div className="recipeCard" key={recipe.id}>
                <h3>{recipe.name}</h3>
                <img
                  className="recipeImg"
                  src={recipe.image}
                  style={{ height: '200px' }}
                />
                <br />
                <br />
                <Link to={`/recipes/${recipe.id}`}>
                  <button>View</button>
                </Link>
                <h5>{recipe.rating} of 5 stars</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
