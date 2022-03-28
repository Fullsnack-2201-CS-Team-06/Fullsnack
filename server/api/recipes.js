const router = require('express').Router();
module.exports = router;
const Recipe = require('../db/models/Recipe');
const Ingredient = require('../db/models/Ingredient');
const User = require('../db/models/User');
const ShoppingList = require('../db/models/ShoppingList');
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

//POST api/recipes/recs
router.post('/recs', async (req, res, next) => {
  try {
    const {
      name,
      image,
      cuisineType,
      caloriesPerRecipe,
      proteinPerRecipe,
      carbsPerRecipe,
      fatPerRecipe,
      ingredients,
    } = req.body;

    let newRecipe = await Recipe.create({
      name,
      image,
      cuisineType,
      caloriesPerRecipe,
      proteinPerRecipe,
      carbsPerRecipe,
      fatPerRecipe,
    });

    await Promise.all(
      ingredients.map(async (ingredient) => {
        let ingredientToAdd = await Ingredient.findOne({
          where: {
            name: ingredient.name,
          },
        });

        if (!ingredientToAdd) {
          ingredientToAdd = await Ingredient.create(ingredient);
        }
        await newRecipe.addIngredient(ingredientToAdd, {
          through: { recipeQty: ingredient.quantity },
        });
      })
    );

    newRecipe = await Recipe.findOne({
      where: {
        name: newRecipe.name,
        userId: null,
      },
      include: Ingredient,
    });

    res.send(newRecipe);
  } catch (error) {
    next(error);
  }
});

// PUT /api/recipes/recs/:id?userId=INT
router.put('/recs/:id', async (req, res, next) => {
  try {
    //Step 1: Assign the existing recipe to the user.
    const recRecipeId = req.params.id;
    const { userId } = req.query;
    const recRecipe = await Recipe.findByPk(recRecipeId, {
      include: Ingredient,
    });
    const user = await User.findByPk(userId);
    await recRecipe.setUser(user);

    //Step 2: Find the ingredients and assign them to the shopping list.
    const shoppingList = await ShoppingList.findOne({
      where: {
        status: 'open',
        userId: userId,
      },
    });

    //Assign each ingredient to the user's open shopping list.
    await Promise.all(
      recRecipe.ingredients.map(async (ingredient) => {
        await ingredient.addShoppingList(shoppingList);
      })
    );
    const updatedRecipe = await Recipe.findByPk(recRecipeId);
    res.send(updatedRecipe);
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

    // Get ingredients currently attached to recipe
    const currentIngredients = await updatedRecipe.getIngredients();

    // Get list of names of ingredients to update from request body
    const newIngredientNames = ingredients.map((ingredient) => ingredient.name);

    // For each recipe, update associated recipe ingredient & its qty
    ingredients.map(async (ingredient) => {
      // Find ingredient to update
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

      // Add/updated qty
      await updatedRecipe.addIngredient(ingredientToAdd, {
        through: { recipeQty: ingredient.recipeQty },
      });

      // If current ingredient is not in list of updated ingredients, remove association
      currentIngredients.map(async (ingredient) => {
        if (!newIngredientNames.includes(ingredient.dataValues.name)) {
          const ingredientToRemove = await Ingredient.findOne({
            where: {
              name: ingredient.dataValues.name,
            },
          });
          
          await updatedRecipe.removeIngredient(ingredientToRemove);
        }
      });
    });

    const newUpdatedRecipe = await Recipe.findByPk(req.params.id);

    res.send(newUpdatedRecipe);
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
