"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    static associate(models) {
      // Define associations here
      Assignment.belongsTo(models.Classroom, {
        foreignKey: "classId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Assignment.hasMany(models.UserAssignment, {
        foreignKey: "assignmentId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Assignment.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Classes",
          key: "id",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Assignment",
      tableName: "Assignments",
      timestamps: true,
    }
  );

  return Assignment;
};
