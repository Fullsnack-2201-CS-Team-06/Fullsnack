import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showRecRecipes } from '../store/recRecipes';

/* OBJECTIVE: Show a number of recipes as recommendations to the user. For now, search all the recipes that are not already associated with the user. Sort those such that the top results show recipes that require the least number of new ingredients. When we implement the API, we can obtain either the full list of rec recipes from there, or we could use the api to fill in a deficit of results once we filter the user's preferences.*/
const RecRecipes = () => {
  const { id } = useSelector((state) => state.auth);
  const { recRecipes } = useSelector((state) => state);
  const dispatch = useDispatch();

  //Get all the recommended recipes not associated with the current user.
  useEffect(() => {
    dispatch(showRecRecipes(id));
  }, []);

  return <div>HI</div>;
};

export default RecRecipes;
