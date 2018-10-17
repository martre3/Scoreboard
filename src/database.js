const Sequelize = require('sequelize');
exports.sequelize = new Sequelize('scoreboard', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
