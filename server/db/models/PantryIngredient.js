const Sequelize = require('sequelize');
const db = require('../db');

const PantryIngredient = db.define('pantryIngredient', {
  pantryQty: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    }
  }
})

module.exports = PantryIngredient
