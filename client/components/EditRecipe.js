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

  const { userId, foods } = useSelector((state) => {
    return {
      userId: state.auth.id,
      foods: state.foods,
    };
  });

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleRecipe(id));
    dispatch(getFoods(userId));
  }, []);

  return <div>Edit Recipe Here</div>;
};

export default EditRecipe;
