const Sequelize = require('sequelize');
const db = require('../db');

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
  caloriesPerRecipe: {
    type: Sequelize.INTEGER,
  },
  proteinPerRecipe: {
    type: Sequelize.DECIMAL,
  },
  carbsPerRecipe: {
    type: Sequelize.DECIMAL,
  },
  fatPerRecipe: {
    type: Sequelize.DECIMAL,
  },
  image: {
    type: Sequelize.STRING,
  },
  cuisineType: {
    type: Sequelize.ENUM(
      'American',
      'Asian',
      'British',
      'Caribbean',
      'Central Europe',
      'Chinese',
      'Eastern Europe',
      'French',
      'Indian',
      'Italian',
      'Japanse',
      'Kosher',
      'Mediterranean',
      'Mexican',
      'Middle Eastern',
      'Nordic',
      'South American',
      'South East Asian',
      'None'
    ),
  },
  frequency: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Recipe;
