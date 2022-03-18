const Sequelize = require('sequelize');
const db = require('../db');

const RecipeIngredient = db.define('recipeIngredient', {
  recipeQty: {
    type: Sequelize.DECIMAL,
  },
});

module.exports = RecipeIngredient;
