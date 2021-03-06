import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  showRecRecipes,
  getNewRecRecipes,
  removeRecRecipe,
} from '../store/recRecipes';
import { getOurFoods } from '../store/pantriesFoods';
import { addRecToMyRecipes } from '../store/recipes';
import styles from './RecRecipes.module.css';
import { Card, Button, Container } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

/* OBJECTIVE: Show a number of recipes as recommendations to the user. For now, search all the recipes that are not already associated with the user. Sort those such that the top results show recipes that require the least number of new ingredients. When we implement the API, we can obtain either the full list of rec recipes from there, or we could use the api to fill in a deficit of results once we filter the user's preferences.*/

const RecRecipes = () => {
  const { id, cuisinePref, diet, health } = useSelector((state) => state.auth);
  let { recRecipes, pantriesFoods, recipes } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentView, setCurrentView] = useState(null);
  const [index, setIndex] = useState(0);

  //First, get the recommended recipes and the user's pantry ingredients.
  useEffect(() => {
    dispatch(showRecRecipes(cuisinePref));
    dispatch(getOurFoods(id)); //Get the ingredients associated with the user to sort results.
  }, []);

  const didMount = useRef(false);
  //Get all the recommended recipes not associated with the current user.
  useEffect(() => {
    function getMoreRecs() {
      //The base api url with which we request new recommendations.
      let apiParams = '';
      //Exclude the recipes that we already have.
      if (cuisinePref && cuisinePref !== 'No Preference') {
        apiParams += `&cuisineType=${cuisinePref}`;
      }
      if (diet) {
        apiParams += `&diet=${diet}`;
      }
      if (health) {
        apiParams += `&health=${health}`;
      }
      apiParams += '&random=true';
      dispatch(getNewRecRecipes(apiParams));
    }

    //Only execute the api call after the 2nd render. Otherwise, the recipes needed will be inaccurate.
    if (didMount.current) {
      //When the number of rec recipes falls below five, get ten from the api.
      if (recRecipes.length < 5) {
        console.log('recRecipes.length: ', recRecipes.length);
        getMoreRecs();

        //If there are recipes present, but none match our cuisine preference (due to account update), search again.
      } else if (
        recRecipes.length &&
        cuisinePref &&
        !recRecipes.filter(
          (recRecipe) =>
            recRecipe.cuisineType.toLowerCase() === cuisinePref.toLowerCase()
        ).length
      ) {
        console.log(
          'Not enough recs to meet your cuisine preference. Getting more!'
        );
        getMoreRecs();
      }
    } else {
      didMount.current = true;
    }
  }, [recRecipes]);

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

  function sortByCuisinePref(recipes) {
    let matches = [];
    let nonMatches = [];
    recipes.forEach((recipe) => {
      if (recipe.cuisineType === cuisinePref) {
        matches.push(recipe);
      } else {
        nonMatches.push(recipe);
      }
    });
    const sortedResults = matches.concat(nonMatches);
    return sortedResults;
  }

  function addToMyRecipes(recipeId) {
    dispatch(addRecToMyRecipes(recipeId, id));
    dispatch(removeRecRecipe(recipeId));
  }

  //Sort the rec recipes by those that need the least new ingredients.
  recRecipes = sortByAvailablility(recRecipes);
  //Sort the rec recipes such that the user's cuisineType preference appears first.
  recRecipes = sortByCuisinePref(recRecipes);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive} arrows showDots={false}>
      {recRecipes.map((recipe) => (
        <Card
          key={recipe.id}
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
            <Link to={`/recipes/recommended/${recipe.id}`}>
              <Button variant="primary" className={styles.button}>
                View
              </Button>
            </Link>
            <Button
              variant="outline-primary"
              className={styles.buttonOutline}
              onClick={() => addToMyRecipes(recipe.id)}
            >
              Add to My Recipes
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Carousel>
  );
};

export default RecRecipes;
