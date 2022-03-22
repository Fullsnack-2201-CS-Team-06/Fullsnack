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
      <h1>My Recipes</h1>
    </div>
  );
};

export default Recipes;
