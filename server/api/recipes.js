const router = require('express').Router();
module.exports = router;
const Recipe = require('../db/models/Recipe');
const Ingredient = require('../db/models/Ingredient');

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
      caloriesPerRecipe,
      proteinPerRecipe,
      carbsPerRecipe,
      fatPerRecipe,
      image,
      cuisineType,
      frequency,
    } = req.body;

    const newRecipe = await Recipe.create({
      name,
      description,
      rating,
      caloriesPerRecipe,
      proteinPerRecipe,
      carbsPerRecipe,
      fatPerRecipe,
      image,
      cuisineType,
      frequency,
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

    const {
      name,
      description,
      rating,
      caloriesPerRecipe,
      proteinPerRecipe,
      carbsPerRecipe,
      fatPerRecipe,
      image,
      cuisineType,
      frequency,
    } = req.body;

    const updatedRecipe = await recipe.update({
      name,
      description,
      rating,
      caloriesPerRecipe,
      proteinPerRecipe,
      carbsPerRecipe,
      fatPerRecipe,
      image,
      cuisineType,
      frequency,
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
