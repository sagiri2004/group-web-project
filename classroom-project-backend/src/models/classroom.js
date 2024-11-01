"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    static associate(models) {
      // Define associations here
      Classroom.belongsToMany(models.User, {
        through: "Users_Classrooms",
        foreignKey: "classroomId",
        otherKey: "userId",
      });
    }
  }
  Classroom.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Classroom",
      tableName: "Classrooms",
      timestamps: true,
    }
  );
  return Classroom;
};
