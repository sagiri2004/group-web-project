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

      // FlashcardSet associations
      User.belongsToMany(models.FlashcardSet, {
        through: "Users_FlashcardSets",
        foreignKey: "userId",
        otherKey: "flashcardSetId",
        as: "flashcardSets",
      });

      // Post associations
      User.hasMany(models.Post, {
        foreignKey: "userId",
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
      status: {
        // Thêm trường status để quản lý trạng thái tài khoản
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active", // active, suspended
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
