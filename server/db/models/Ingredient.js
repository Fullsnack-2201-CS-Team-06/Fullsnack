const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const foodCategories = [
  'produce',
  'meat',
  'dairy',
  'dry goods',
  'bakery',
  'beverages',
  'miscellaneous',
];

const Ingredient = db.define('ingredient', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  uom: {
    type: Sequelize.STRING,
    defaultValue: 'each',
  },

  category: {
    type: Sequelize.STRING,
    // type: Sequelize.ENUM(...foodCategories),
    defaultValue: 'miscellaneous',
  },

  caloriesPerUnit: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },

  proteinPerUnit: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.0,
  },

  carbsPerUnit: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.0,
  },

  fatsPerUnit: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.0,
  },

  image: {
    type: Sequelize.STRING,
    defaultValue:
      'https://media.istockphoto.com/photos/fried-pork-and-vegetables-on-white-background-picture-id1190330112?k=20&m=1190330112&s=612x612&w=0&h=_TrmthJupdqYmMU-NC-es85TEvaBJsynDS383hqiAvM=',
  },
});

Ingredient.beforeCreate(async (food) => {
  if (
    food.caloriesPerUnit === 0 &&
    food.proteinPerUnit === 0 &&
    food.carbsPerUnit === 0 &&
    food.fatsPerUnit === 0
  ) {
    const res = await axios.get(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.REACT_APP_FOOD_APP_ID}&app_key=${process.env.REACT_APP_FOOD_KEY}&ingr=${food.name}&nutrition-type=cooking`
    );
    if (res.data.parsed.length > 0) {
      const { ENERC_KCAL, PROCNT, FAT, CHOCDF } =
        res.data.parsed[0].food.nutrients;
      food.caloriesPerUnit = ENERC_KCAL;
      food.proteinPerUnit = PROCNT;
      food.fatsPerUnit = FAT;
      food.carbsPerUnit = CHOCDF;
    }
  }
});

module.exports = Ingredient;
