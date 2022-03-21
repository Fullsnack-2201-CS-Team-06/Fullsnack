import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFoods } from '../store/foods';
const dispatch = useDispatch();

/* This page shows all the ingredients that could exist in a user's pantry and exist as parts of a recipe. Their main purpose is to store general nutritional information and cost per unit of measurement. In a user's view, ingredients can be created manually, but they can also be created automatically whenever new foods are added to recipes, shopping lists, or pantries of the user. Users can access the complete list of ingredients associated with their profile, even for recipes that no longer exist. There, they can manually set or update the nutritional info and cost associated with that ingredient. */
const Food = () => {
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getFoods(id));
  }, []);

  return <div></div>;
};

export default Food;
