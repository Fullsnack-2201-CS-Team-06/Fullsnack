import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllRecipes } from '../store/recipes';

const Recipes = () => {
  const { recipes } = useSelector(state => {
    return {
      recipes: state.recipes
    }
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllRecipes())
  }, [])

  return (
    <div>
      <h1>My Recipes</h1>
    </div>
  );
};

export default Recipes;
