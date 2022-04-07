const router = require('express').Router();
module.exports = router;
const PantryIngredient = require('../db/models/PantryIngredient');
const Ingredient = require('../db/models/Ingredient');
const authenticateToken = require('../auth/authenticateToken')

// GET /api/pantryIngredients?pantryId=1
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const pantryIngredients = await PantryIngredient.findAll({
      where: { pantryId: req.query.pantryId },
      include: Ingredient,
    });
    if (!pantryIngredients) {
      next({ status: 404, message: 'No ingredients found for this pantryId' });
    }
    res.send(pantryIngredients);
  } catch (error) {
    next(error);
  }
});

// POST /api/pantryIngredient
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const { pantryQty } = req.body;
    if (pantryQty === undefined) {
      next({ status: 404, message: "No 'pantryQty' on req.body." });
    }
    const newPantryQty = await PantryIngredient.create({
      pantryQty,
    });
    res.send(newPantryQty);
  } catch (error) {
    next(error);
  }
});

// PUT /api/pantryIngredients/:id
router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    const pantryIngredient = await PantryIngredient.findByPk(req.params.id);
    if (!pantryIngredient) {
      next({ status: 404, message: 'No ingredients found at this pantryId' });
    }
    const { pantryQty } = req.body;
    if (pantryQty === undefined) {
      next({ status: 404, message: "No 'pantryQty' on req.body." });
    }
    const result = await pantryIngredient.update({
      pantryQty,
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/pantryIngredients/:id
router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const pantryIngredient = await PantryIngredient.findByPk(req.params.id);
    if (!pantryIngredient) {
      next({ status: 404, message: 'No ingredients found at this pantryId' });
    }
    const result = await pantryIngredient.destroy();
    if (result !== 1) {
      next({
        status: 404,
        message: 'Failed to destroy the ingredient at this pantryId',
      });
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
});
