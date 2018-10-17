'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    name: DataTypes.STRING,
    time: DataTypes.DATE(6)
  }, {});
  Result.associate = function(models) {
  };
  return Result;
};