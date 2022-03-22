const Sequelize = require('sequelize');
const db = require('../db');

const ShoppingListIngredient = db.define('shoppingListIngredient', {
  sliQuantity: {
    type: Sequelize.INTEGER,
  },

  cost: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0.0,
    },
  },

  uom: {
    type: Sequelize.STRING,
    defaultValue: 'each',
  },
});

module.exports = ShoppingListIngredient;
