'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: "userId", as: "profile" });
      User.belongsToMany(models.FlashcardSet, {
        through: models.FlashcardSetUser, // Phải khớp với tên bảng trung gian
        foreignKey: "userId",
        otherKey: "flashcardSetId",
        as: "flashcardSets",
      });
      User.hasMany(models.Folder, { foreignKey: "userId", as: "folders" })
      // history
      User.hasMany(models.UserHistory, { foreignKey: "userId", as: "userHistories" });
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