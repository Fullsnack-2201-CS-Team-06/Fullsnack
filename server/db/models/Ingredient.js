const Sequelize = require('sequelize');
const db = require('../db');

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
    type: Sequelize.ENUM(
      'produce',
      'meat',
      'dairy',
      'dry goods',
      'bakery',
      'beverages',
      'miscellaneous'
    ),
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

module.exports = Ingredient;
