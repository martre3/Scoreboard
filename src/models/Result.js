const Sequelize = require('sequelize');
const sequelize = require('../database');

const Result = sequelize.sequelize.define('Results', {
  name: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.STRING
  }
});

module.exports = Result;
