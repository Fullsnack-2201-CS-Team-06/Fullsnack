const Sequelize = require('sequelize');
const db = require('../db');

const ShoppingListIngredient = db.define('shoppingListIngredient', {
  sliQuantity: {
    type: Sequelize.INTEGER,
  },

  uom: {
    type: Sequelize.STRING,
    defaultValue: 'each',
  },
});

module.exports = ShoppingListIngredient;
