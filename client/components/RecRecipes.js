import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  showRecRecipes,
  addRecRecipe,
  removeRecRecipe,
} from '../store/recRecipes';
import { getOurFoods } from '../store/pantriesFoods';
import { addRecToMyRecipes } from '../store/recipes';
import styles from './RecRecipes.module.css';
import { Card, Button, Accordion, Container } from 'react-bootstrap';

/* OBJECTIVE: Show a number of recipes as recommendations to the user. For now, search all the recipes that are not already associated with the user. Sort those such that the top results show recipes that require the least number of new ingredients. When we implement the API, we can obtain either the full list of rec recipes from there, or we could use the api to fill in a deficit of results once we filter the user's preferences.*/

const RecRecipes = () => {
  const { id, cuisinePref, diet, health } = useSelector((state) => state.auth);
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
    async function getMoreRecs() {
      //The base api url with which we request new recommendations.
      // let apiRequest =
      //   'https://api.edamam.com/search?q=&app_id=89f75d08&app_key=a50a2a8174970ec300397dea3db7f843&mealType=Dinner';
      let apiRequest =
        'https://api.edamam.com/api/recipes/v2?type=public&q=&app_id=89f75d08&app_key=a50a2a8174970ec300397dea3db7f843&mealType=Dinner';
      //Exclude the recipes that we already have.
      if (cuisinePref && cuisinePref !== 'No Preference') {
        apiRequest += `&cuisineType=${cuisinePref}`;
      }
      if (diet) {
        apiRequest += `&diet=${diet}`;
      }
      if (health) {
        apiRequest += `&health=${health}`;
      }
      recipes.forEach((recipe) => {
        const recipeWords = recipe.name.split(' ').join('%20');
        apiRequest += `&excluded=${recipeWords}`;
      });
      //Exclude the recipes already in our recommendations.
      recRecipes.forEach((recRecipe) => {
        const recipeWords = recRecipe.name.split(' ').join('%20');
        apiRequest += `&excluded=${recipeWords}`;
      });
      console.log(apiRequest);
      const data = await fetch(apiRequest).then((response) => response.json());
      console.log('data: ', data);

      //Add the ten received api rec recipes to our pool of rec recipes.
      for (let i = 0; i < data.hits.length; i++) {
        const recipe = data.hits[i].recipe;
        dispatch(
          addRecRecipe({
            name: recipe.label,
            description: recipe.url,
            image: recipe.image,
            cuisineType: recipe.cuisineType[0],
            caloriesPerRecipe: Math.floor(recipe.calories),
            proteinPerRecipe: Math.floor(recipe.totalNutrients.PROCNT.quantity),
            carbsPerRecipe: Math.floor(recipe.totalNutrients.CHOCDF.quantity),
            fatPerRecipe: Math.floor(recipe.totalNutrients.FAT.quantity),
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
      //When the number of rec recipes falls below five, get ten from the api.
      if (recRecipes.length < 5) {
        getMoreRecs();
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
  function sortByAvailablility(recipes) {
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
  }

  function addToMyRecipes(recipeId) {
    dispatch(addRecToMyRecipes(recipeId, id));
    dispatch(removeRecRecipe(recipeId));
  }

  //Sort the rec recipes by those that need the least new ingredients.
  recRecipes = sortByAvailablility(recRecipes);

  return (
    <Container className={styles.container}>
      <h1>Recommended Recipes</h1>
      <Accordion defaultActiveKey="0">
        <Container className={styles.recRecipes}>
          {recRecipes.map((recipe, i) => (
            <Card
              key={i}
              className={
                recipe.id === currentView
                  ? styles.expandedCard
                  : styles.recRecipeCard
              }
            >
              <Card.Img
                variant="top"
                className={styles.recipeImg}
                src={recipe.image}
              />
              <Card.Body>
                <Card.Title>
                  {recipe.id === currentView
                    ? recipe.name
                    : recipe.name.slice(0, 20)}
                  {recipe.id !== currentView && recipe.name.length > 20
                    ? '...'
                    : ''}
                </Card.Title>
                <Button
                  variant="outline-primary"
                  className={styles.buttonOutline}
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
                    <a href={recipe.description}>
                      <p>Read Full Recipe</p>
                    </a>
                  </Accordion.Body>
                </Accordion.Item>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </Accordion>
    </Container>
  );
};

export default RecRecipes;
