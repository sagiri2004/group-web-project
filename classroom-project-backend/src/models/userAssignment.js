"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserAssignment extends Model {
    static associate(models) {
      // Define associations here
      UserAssignment.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      UserAssignment.belongsTo(models.Assignment, {
        foreignKey: "assignmentId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // user classroom
      UserAssignment.belongsTo(models.UserClassroom, {
        foreignKey: "userId",
        targetKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  UserAssignment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      assignmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Assignments",
          key: "id",
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UserAssignment",
      tableName: "Users_Assignments",
      timestamps: true,
    }
  );

  return UserAssignment;
};
