"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Classroom associations
      User.belongsToMany(models.Classroom, {
        through: "Users_Classrooms",
        foreignKey: "userId",
        otherKey: "classroomId",
      });

      // Message associations
      User.hasMany(models.Message, {
        foreignKey: "senderId",
      });

      // Conversation associations
      User.hasMany(models.Conversation, {
        foreignKey: "senderId",
      });

      User.hasMany(models.Conversation, {
        foreignKey: "receiverId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
    }
  );
  return User;
};
