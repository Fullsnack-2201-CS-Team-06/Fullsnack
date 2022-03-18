const router = require('express').Router();
module.exports = router;
// const PantryIngredient = require('../db/models/PantryIngredient');
const Ingredient = require('../db/models/Ingredient');
const Pantry = require('../db/models/Pantry');

//GET /api/pantries?userId=1
router.get('/', async (req, res, next) => {
  try {
    const pantries = await Pantry.findAll({
      where: { userId: req.query.userId },
      include: Ingredient,
    });
    if (!pantries) {
      next({ status: 404, message: 'No pantries found for this userId' });
    }
    res.send(pantries);
  } catch (error) {
    next(error);
  }
});

// POST /api/pantries
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const newPantry = await Pantry.create(name);
    res.send(newPantry);
  } catch (error) {
    next(error);
  }
});

// PUT /api/pantries/:id
router.put('/:id', async (req, res, next) => {
  try {
    const pantry = await Pantry.findByPk(req.params.id);
    if (!pantry) {
      next({ status: 404, message: 'No pantries found at this id' });
    }
    const { name } = req.body;
    if (name === undefined) {
      next({ status: 404, message: "No 'name' on req.body." });
    }
    const result = await pantry.update({
      name: name,
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/pantries/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const pantry = await Pantry.findByPk(req.params.id);
    if (!pantry) {
      next({ status: 404, message: 'No pantries found at this id' });
    }
    const result = await pantry.destroy();
    if (result !== 1) {
      next({ status: 404, message: 'Failed to destroy the pantry at this id' });
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
});
