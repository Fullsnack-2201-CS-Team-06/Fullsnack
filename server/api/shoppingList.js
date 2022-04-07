const router = require('express').Router();
module.exports = router;
const User = require('../db/models/User');
const Ingredient = require('../db/models/Ingredient');
const ShoppingList = require('../db/models/ShoppingList');
const ShoppingListIngredient = require('../db/models/ShoppingListIngredient');
const Pantry = require('../db/models/Pantry')
const authenticateToken = require('../auth/authenticateToken')

//GET /api/shoppingList/all?userId=1 status: closed
router.get('/all', authenticateToken, async (req, res, next) => {
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

//GET /api/shoppingList?userId=1 status: open
router.get('/', authenticateToken, async (req, res, next) => {
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

//GET /api/shoppingList/:listId status: open
router.get('/:listId', authenticateToken, async (req, res, next) => {
  try {
    const shoppingList = await ShoppingList.findByPk(req.params.listId, {
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
router.put('/', authenticateToken, async (req, res, next) => {
  try {
    //Find the user's current shopping list
    const shoppingList = await ShoppingList.findOne({
      where: { userId: req.query.userId, status: 'open' },
      include: Ingredient,
    })
    //itemId = Ingredient.id, quantity = INT
    const { itemId, quantity, cost } = req.body
    //Find the ingredient associated with the id we have
    const ingredientToUpdate = await Ingredient.findByPk(itemId)
    if (!quantity) {
      if (shoppingList.hasIngredient(ingredientToUpdate)) {
        let initialAmount = 0
        shoppingList.ingredients.forEach(curr => {
          if (itemId === curr.id) {
            initialAmount += curr.shoppingListIngredient.sliQuantity
          }
        })
        await shoppingList.addIngredients(ingredientToUpdate, { through: { sliQuantity: initialAmount * 1 + 1 }})
      } else {
        await shoppingList.addIngredient(ingredientToUpdate, { through: { sliQuantity: 1 }})
      }
    }
    if (quantity === 0) await shoppingList.removeIngredient(ingredientToUpdate)
    else {
      await shoppingList.addIngredient(ingredientToUpdate, { through: { sliQuantity: quantity, cost: cost }})
    }
    const refreshList = await ShoppingList.findOne({
      where: { userId: req.query.userId, status: 'open' },
      include: Ingredient,
    });
    res.send(refreshList);
  } catch (error) {
    next(error);
  }
});

// POST /api/shoppingList?userId=1
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const shoppingList = await ShoppingList.findOne({
      where: { userId: req.query.userId, status: 'open' },
      include: Ingredient,
    });
    if (!shoppingList) {
      next({ status: 404, message: 'No shopping list found at this id' });
    }
    const { totalCost, pantryId } = req.body;
    const currentPantry = await Pantry.findByPk(pantryId, { include: Ingredient })

    await shoppingList.ingredients.forEach(addMeToPantry => {
      const { id } = addMeToPantry
      const {sliQuantity, cost} = addMeToPantry.shoppingListIngredient
      if (currentPantry.hasIngredient(addMeToPantry)) {
        let initialAmount = 0
        currentPantry.ingredients.forEach(curr => {
          if (id === curr.id) {
            initialAmount += curr.pantryIngredient.pantryQty
          }
        })
        currentPantry.addIngredient(addMeToPantry, {through: {
          pantryQty: sliQuantity * 1 + initialAmount * 1, cost: cost
        }})
      } else {
        currentPantry.addIngredient(addMeToPantry, {through: {
          pantryQty: sliQuantity, cost: cost
        }})
      }
    })

    await shoppingList.update({
      totalCost,
      status: 'closed',
      checkoutDate: new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}),
    });
    const newShoppingList = await ShoppingList.create({
      name: 'new shopping list',
    });
    const user = await User.findByPk(req.query.userId);
    await newShoppingList.setUser(user);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/shoppingList/:id
router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const shoppingList = await ShoppingList.findByPk(req.params.id);
    if (!shoppingList) {
      next({ status: 404, message: 'No shopping list found at this id' });
    }
    const result = await shoppingList.destroy();
    if (result !== 1) {
      next({
        status: 404,
        message: 'Failed to destroy the shopping list at this id',
      });
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
});
