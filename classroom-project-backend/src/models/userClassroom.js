"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class UserClassroom extends Model {
    static associate(models) {
      UserClassroom.belongsTo(models.Classroom, {
        foreignKey: "classroomId",
      });
      UserClassroom.belongsTo(models.User, {
        foreignKey: "userId",
      });
      UserClassroom.hasMany(models.UserAssignment, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
    }
  }

  UserClassroom.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      classroomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "UserClassroom",
      tableName: "Users_Classrooms",
    }
  );

  return UserClassroom;
};
