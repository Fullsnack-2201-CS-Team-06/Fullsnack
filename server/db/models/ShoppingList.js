const Sequelize = require('sequelize');
const db = require('../db');

const ShoppingList = db.define('shoppingList', {
  name: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open',
  },

  totalCost: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.0,
  },

  checkoutDate: {
    type: Sequelize.DATE,
  },
});

module.exports = ShoppingList;
