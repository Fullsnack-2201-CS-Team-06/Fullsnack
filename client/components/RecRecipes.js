import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  showRecRecipes,
  addRecRecipe,
  removeRecRecipe,
} from '../store/recRecipes';
import { getOurFoods } from '../store/pantriesFoods';
import { addRecToMyRecipes } from '../store/recipes';
import styles from './RecRecipes.module.css';
import { Card, Button, Accordion } from 'react-bootstrap';

/* OBJECTIVE: Show a number of recipes as recommendations to the user. For now, search all the recipes that are not already associated with the user. Sort those such that the top results show recipes that require the least number of new ingredients. When we implement the API, we can obtain either the full list of rec recipes from there, or we could use the api to fill in a deficit of results once we filter the user's preferences.*/

const RecRecipes = () => {
  const { id } = useSelector((state) => state.auth);
  let { recRecipes, pantriesFoods, recipes } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentView, setCurrentView] = useState(null);

  //First, get the recommended recipes and the user's pantry ingredients.
  useEffect(() => {
    dispatch(showRecRecipes());
    dispatch(getOurFoods(id)); //Get the ingredients associated with the user to sort results.
  }, []);

  const didMount = useRef(false);
  //Get all the recommended recipes not associated with the current user.
  useEffect(() => {
    async function getMoreRecs(reqs) {
      let apiRequest =
        'https://api.edamam.com/search?q=&app_id=89f75d08&app_key=a50a2a8174970ec300397dea3db7f843&mealType=Dinner';
      recipes.forEach((recipe) => (apiRequest += `&excluded=${recipe.name}`));
      recRecipes.forEach(
        (recRecipe) => (apiRequest += `&excluded=${recRecipe.name}`)
      );
      const data = await fetch(apiRequest).then((response) => response.json());
      console.log('data: ', data);

      //Create recipes for the needed number to meet the threshold. For example, if we already have 3 to recommend, get 7 from the api.
      for (let i = 0; i < reqs; i++) {
        const recipe = data.hits[i].recipe;
        dispatch(
          addRecRecipe({
            name: recipe.label,
            image: recipe.image,
            cuisineType: recipe.cuisineType[0],
            caloriesPerRecipe: Math.floor(recipe.calories),
            ingredients: recipe.ingredients.map((ingredient) => {
              return {
                name: ingredient.food,
                uom: ingredient.measure,
                category: ingredient.foodCategory,
                image: ingredient.image,
                quantity: ingredient.quantity,
              };
            }),
          })
        );
      }
    }

    //Only execute the api call after the 2nd render. Otherwise, the recipes needed will be inaccurate.
    if (didMount.current) {
      const recipesNeeded = 10 - recRecipes.length;
      if (recipesNeeded > 0) {
        getMoreRecs(recipesNeeded);
      }
    } else {
      didMount.current = true;
    }
  }, [recipes]);

  console.log('recRecipes: ', recRecipes);

  const expandView = (id) => {
    if (id !== currentView) {
      setCurrentView(id);
    } else {
      setCurrentView(null);
    }
  };

  //Sort the recipes according to those that require the least number of new ingredients. Current issue: Sorting happens on the  front-end since we need both the recipe and the food data in the pantries. To get the foods, I wrote a route api/ingredients/pantries?userId=INT which gets the ingredients in all the pantries, but it includes duplicates, since we want to consider the total quantity across all pantries. This data is set on the foods reducer in the store. The allFoods page also uses that reducer, but since there are duplicates, this causes errors on the first render, before that page executes a separate thunk that eliminates duplicates.
  const sortByAvailablility = (recipes) => {
    //The total amount we have for each food across our pantries, e.g., {carrot: 4}
    const combinedTotals = {};
    pantriesFoods.forEach((food) => {
      if (combinedTotals[food.name]) {
        combinedTotals[food.name] += food.pantryIngredient.pantryQty;
      } else {
        combinedTotals[food.name] = food.pantryIngredient.pantryQty;
      }
    });

    recipes.forEach((recipe) => {
      recipe['needsIngredients'] = recipe.ingredients.length;
      recipe.ingredients.forEach((ingredient) => {
        if (
          ingredient.recipeIngredient.recipeQty <=
          combinedTotals[ingredient.name]
        ) {
          recipe.needsIngredients -= 1;
        }
      });
    });

    recipes.sort((a, b) => a.needsIngredients - b.needsIngredients);
    return recipes;
  };

  const addToMyRecipes = (recipeId) => {
    dispatch(addRecToMyRecipes(recipeId, id));
    // dispatch(showRecRecipes());
    dispatch(removeRecRecipe(recipeId));
  };

  recRecipes = sortByAvailablility(recRecipes);

  return (
    <div className={styles.container}>
      <h1>Recommended Recipes</h1>
      <div className={styles.recRecipes}>
        {recRecipes.map((recipe, i) => (
          <Accordion key={i}>
            <Card
              key={i}
              className={
                recipe.id === currentView
                  ? styles.expandedCard
                  : styles.recRecipeCard
              }
            >
              <Card.Img variant="top" src={recipe.image} />
              <Card.Title>{recipe.name}</Card.Title>
              <Button
                variant="primary"
                onClick={() => addToMyRecipes(recipe.id)}
              >
                Add to My Recipes
              </Button>
              <Accordion.Item eventKey={i}>
                <Accordion.Header onClick={() => expandView(recipe.id)}>
                  Read More
                </Accordion.Header>
                <Accordion.Body>
                  <p>Calories: {recipe.caloriesPerRecipe}</p>
                  <p>Protein: {recipe.proteinPerRecipe}</p>
                  <p>Carbs: {recipe.carbsPerRecipe}</p>
                  <p>Fat: {recipe.fatPerRecipe}</p>
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default RecRecipes;
