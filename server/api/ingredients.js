const router = require('express').Router();
module.exports = router;
const Ingredient = require('../db/models/Ingredient');
const Pantry = require('../db/models/Pantry');

//GET /api/ingredients?userId=INT
router.get('/', async (req, res, next) => {
  try {
    //INCOMPLETE. How do we get ingredient info associated only with one user? Cost depends on a user's input (Users buy at different locations). We need a direct association between the user and their ingredients with the cost on a through table. For now, I will render all ingredients that are on a user's pantries. Changing the cost will do so for all users.
    let ingredients = [];

    //Get all the pantries of the user and their associated ingredients.
    const pantries = await Pantry.findAll({
      where: { userId: req.query.userId },
      include: Ingredient,
    });

    if (pantries) {
      //Get all the ingredients associated with all the pantries.
      ingredients = pantries.reduce((prev, pantry) => {
        return prev.concat(pantry.ingredients);
      }, []);

      //Eliminate duplicates of ingredients existing in multiple pantries.
      const foundFoods = [];
      ingredients = ingredients.filter((food) => {
        const isFound = foundFoods.includes(food.id);
        if (!isFound) {
          foundFoods.push(food.id);
        }
        return !isFound;
      });
    }
    res.send(ingredients);
  } catch (error) {
    next(error);
  }
});
