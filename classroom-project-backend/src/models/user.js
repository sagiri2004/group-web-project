'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // association 
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // 0 for user, 1 for admin
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};