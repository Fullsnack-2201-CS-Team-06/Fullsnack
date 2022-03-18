const Sequelize = require('sequelize');
const db = require('../db');

const Pantry = db.define('pantry', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Pantry
