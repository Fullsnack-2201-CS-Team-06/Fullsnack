const Sequelize = require('sequelize');
const db = require('../db');

const PantryIngredient = db.define('pantryIngredient', {
  pantryQty: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
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

module.exports = PantryIngredient;
