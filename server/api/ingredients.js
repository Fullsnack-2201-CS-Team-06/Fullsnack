const router = require('express').Router();
module.exports = router;
const Ingredient = require('../db/models/Ingredient');
const Pantry = require('../db/models/Pantry');
const ShoppingList = require('../db/models/ShoppingList');
const Recipe = require('../db/models/Recipe');

//GET /api/ingredients?userId=INT
router.get('/', async (req, res, next) => {
  try {
    let ingredients = [];
    //Get all the pantries of the user and their associated ingredients.
    const pantries = await Pantry.findAll({
      where: { userId: req.query.userId },
      include: Ingredient,
    });

    //All the user's shopping lists.
    const shoppingLists = await ShoppingList.findAll({
      where: { userId: req.query.userId },
      include: Ingredient,
    });

    //All the user's recipes.
    const recipes = await Recipe.findAll({
      where: { userId: req.query.userId },
      include: Ingredient,
    });

    if (pantries.length > 0) {
      //Get all the ingredients associated with all the user's pantries.
      ingredients = pantries.reduce((prev, pantry) => {
        return prev.concat(pantry.ingredients);
      }, []);
    }

    if (shoppingLists.length > 0) {
      //Get all the ingredients associated with the user's shopping lists.
      ingredients = ingredients.concat(
        shoppingLists.reduce((prev, list) => {
          return prev.concat(list.ingredients);
        }, [])
      );
    }

    if (recipes.length > 0) {
      //Get all the ingredients associated with the user's recipes.
      ingredients = ingredients.concat(
        recipes.reduce((prev, recipe) => {
          return prev.concat(recipe.ingredients);
        }, [])
      );
    }

    //Eliminate duplicates of ingredients existing in multiple places on the user's entities.
    const foundFoods = [];
    ingredients = ingredients.filter((food) => {
      const isFound = foundFoods.includes(food.id);
      if (!isFound) {
        foundFoods.push(food.id);
      }
      return !isFound;
    });

    res.send(ingredients);
  } catch (error) {
    next(error);
  }
});

//POST api/ingredients?userId=INT
router.post('/', async (req, res, next) => {
  try {
    const newFood = req.body;
    if (newFood) {
      //Is there already an ingredient matching this name?
      const prevIngredient = await Ingredient.findOne({
        where: { name: newFood.name },
      });
      if (prevIngredient) {
        //If so, update that ingredient and return it.
        const newIngredient = await prevIngredient.update(newFood);
        res.send(newIngredient);
      } else {
        //Otherwise, create a new ingredient and return it.
        const newIngredient = await Ingredient.create(newFood);
        res.send(newIngredient);
      }
    }
  } catch (error) {
    next(error);
  }
});

//PUT api/ingredients/:id
router.put('/:id', async (req, res, next) => {
  try {
    const newFood = req.body;
    if (newFood) {
      const prevFood = await Ingredient.findByPk(req.params.id);
      if (prevFood) {
        const updatedFood = await prevFood.update(newFood);
        res.send(updatedFood);
      } else {
        console.log('Failed to find the existing food by its id');
      }
    }
  } catch (error) {
    next(error);
  }
});
