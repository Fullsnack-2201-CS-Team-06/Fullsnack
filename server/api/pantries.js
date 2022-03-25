const router = require('express').Router();
module.exports = router;
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

//GET /api/pantries/:pantryId
router.get('/:pantryId', async (req, res, next) => {
  try {
    const singlePantry = await Pantry.findByPk(req.params.pantryId, {
      include: Ingredient,
    });
    if (!singlePantry) {
      next({ status: 404, message: 'No pantries found for this userId' });
    }
    res.send(singlePantry);
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

// POST /api/pantries/add
router.post('/add', async (req, res, next) => {
  try {
    const { id, name, category, quantity, cost, measure } = req.body;
    console.log("We reached pantries/add", req.body)
    const [newItem, wasCreated] = (newPantryItem =
      await Ingredient.findOrCreate({
        where: { name: name },
        defaults: {
          uom: measure,
          category: category,
        }
      }));

    const currentPantry = await Pantry.findByPk(id);
    await currentPantry.addIngredients(newItem, {
      through: { pantryQty: quantity, cost: cost },
    });
    const updatedPantry = await Pantry.findByPk(id, { include: Ingredient });

    res.send(updatedPantry);
  } catch (error) {
    next(error);
  }
});

// PUT /api/pantries/
router.put('/', async (req, res, next) => {
  try {
    const { itemId, quantity, currentPantryId } = req.body;
    console.log("Our pantry id.", currentPantryId)
    const pantry = await Pantry.findOne({
      where: { id: currentPantryId },
      include: Ingredient,
    });
    const ingredientToUpdate = await Ingredient.findByPk(itemId);
    if (quantity === 0) await pantry.removeIngredient(ingredientToUpdate);
    else {
      await pantry.addIngredient(ingredientToUpdate, {
        through: { pantryQty: quantity },
      });
    }
    const refreshPantry = await Pantry.findOne({
      where: { id: currentPantryId },
      include: Ingredient,
    });
    res.send(refreshPantry);
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
