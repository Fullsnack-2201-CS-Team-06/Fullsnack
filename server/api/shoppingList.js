const router = require('express').Router();
module.exports = router;
const Ingredient = require('../db/models/Ingredient');
const ShoppingList = require('../db/models/ShoppingList');

//GET /api/shoppingList/all?userId=1 status: closed
router.get('/all', async (req, res, next) => {
  try {
    const shoppingLists = await ShoppingList.findAll({
      where: { userId: req.query.userId, status: 'closed' },
      include: Ingredient,
    });
    if (!shoppingLists) {
      next({ status: 404, message: 'No shopping lists found for this userId' });
    }
    res.send(shoppingLists);
  } catch (error) {
    next(error);
  }
});

// POST /api/shoppingList
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const newShoppingList = await ShoppingList.create(name);
    res.send(newShoppingList);
  } catch (error) {
    next(error);
  }
});

//GET /api/shoppingList?userId=1 status: open
router.get('/', async (req, res, next) => {
  try {
    const shoppingList = await ShoppingList.findOne({
      where: { userId: req.query.userId, status: 'open' },
      include: Ingredient,
    });
    if (!shoppingList) {
      next({ status: 404, message: 'No shopping lists found for this userId' });
    }
    res.send(shoppingList);
  } catch (error) {
    next(error);
  }
});

//PUT /api/shoppingList?userId=1
router.put('/', async (req, res, next) => {
  try {
    const shoppingList = await ShoppingList.findOne({
      where: { userId: req.query.userId, status: 'open' },
      include: Ingredient,
    })
    const { itemId, quantity } = req.body
    const ingredientToUpdate = await Ingredient.findByPk(itemId)
    if (quantity === 0) await shoppingList.removeIngredient(ingredientToUpdate)
    else {
      await shoppingList.addIngredient(ingredientToUpdate, { through: { sliQuantity: quantity }})
    }
    const refreshList = await ShoppingList.findOne({
      where: { userId: req.query.userId, status: 'open' },
      include: Ingredient,
    })
    res.send(refreshList)
  } catch (error) {
    next(error)
  }
})

// PUT /api/shoppingList/
router.put('/:id', async (req, res, next) => {
  try {
    const shoppingList = await ShoppingList.findByPk(req.params.id);
    if (!shoppingList) {
      next({ status: 404, message: 'No shopping list found at this id' });
    }
    const { name, totalCost, checkoutDate } = req.body;
    if (name === undefined) {
      next({ status: 404, message: "No 'name' on req.body." });
    }
    const result = await shoppingList.update({
      name,
      totalCost,
      checkoutDate
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/shoppingList/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const shoppingList = await ShoppingList.findByPk(req.params.id);
    if (!shoppingList) {
      next({ status: 404, message: 'No shopping list found at this id' });
    }
    const result = await shoppingList.destroy();
    if (result !== 1) {
      next({ status: 404, message: 'Failed to destroy the shopping list at this id' });
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
});
