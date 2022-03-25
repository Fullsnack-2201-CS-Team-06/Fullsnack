const router = require('express').Router();
module.exports = router;
const Recipe = require('../db/models/Recipe');
const Ingredient = require('../db/models/Ingredient');
const User = require('../db/models/User');
const { Op } = require('@sequelize/core');

// GET /api/recipes?userId=1
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      where: { userId: req.query.userId },
      include: Ingredient,
    });

    if (!recipes) {
      next({ status: 404, message: 'No recipes found.' });
    }

    res.send(recipes);
  } catch (error) {
    next(error);
  }
});

// GET /api/recipes/recs
router.get('/recs', async (req, res, next) => {
  try {
    // At this stage, we're just getting all the recipes not assigned to any user. With the api, this route will be entirely replaced.
    const recRecipes = await Recipe.findAll({
      where: { userId: { [Op.is]: null } },
      include: Ingredient,
    });
    if (!recRecipes) {
      next({ status: 404, message: 'No recommended recipes found.' });
    }
    res.send(recRecipes);
  } catch (error) {
    next(error);
  }
});

// GET /api/recipes/:id
router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({
      where: {
        id: req.params.id,
      },
      include: Ingredient,
    });

    if (!recipe) {
      next({ status: 404, message: `Recipe no. ${req.params.id} not found.` });
    }

    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

// POST /api/recipes
router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      description,
      rating,
      image,
      cuisineType,
      userId,
      ingredients,
    } = req.body;

    const newRecipe = await Recipe.create({
      name,
      description,
      rating,
      image,
      cuisineType,
    });

    // Find user creating recipe
    const user = await User.findByPk(userId);

    // Associate recipe with user
    await newRecipe.setUser(user);

    // Associate recipe ingredients & qtys with recipe
    ingredients.map(async (ingredient) => {
      const ingredientToAdd = await Ingredient.findOne({
        where: {
          name: ingredient.name,
        },
      });

      if (!ingredientToAdd) {
        next({
          status: 404,
          message: `Ingredient ${ingredient.name} not found.`,
        });
      }

      await newRecipe.addIngredient(ingredientToAdd, {
        through: { recipeQty: ingredient.recipeQty },
      });
    });

    res.send(newRecipe);
  } catch (error) {
    next(error);
  }
});

// PUT /api/recipes/:id
router.put('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      next({ status: 404, message: `Recipe no. ${req.params.id} not found.` });
    }

    const { name, description, rating, image, cuisineType, ingredients } =
      req.body;

    const updatedRecipe = await recipe.update({
      name,
      description,
      rating,
      image,
      cuisineType,
    });

    const currentIngredients = await updatedRecipe.getIngredients();

    const newIngredientNames = ingredients.map((ingredient) => ingredient.name);

    // Update associated recipe ingredients & qtys
    ingredients.map(async (ingredient) => {
      // Add ingredients and/or update qtys
      const ingredientToAdd = await Ingredient.findOne({
        where: {
          name: ingredient.name,
        },
      });

      if (!ingredientToAdd) {
        next({
          status: 404,
          message: `Ingredient ${ingredient.name} not found.`,
        });
      }

      await updatedRecipe.addIngredient(ingredientToAdd, {
        through: { recipeQty: ingredient.recipeQty },
      });

      // If current ingredient is not in new ingredients, remove association
      currentIngredients.map((ingredient) => {
        if (!newIngredientNames.includes(ingredient.dataValues.name)) {
          updatedRecipe.removeIngredient(ingredientToAdd);
        }
      });
    });

    res.send(updatedRecipe);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/recipe/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      next({ status: 404, message: `Recipe no. ${req.params.id} not found.` });
    }

    const deletedRecipe = await recipe.destroy();

    if (result !== 1) {
      next({
        status: 404,
        message: `Failed to destroy recipe no. ${req.params.id}`,
      });
    }

    res.send(deletedRecipe);
  } catch (error) {
    next(error);
  }
});
