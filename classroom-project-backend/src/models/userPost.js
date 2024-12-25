"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserPost extends Model {
    static associate(models) {
      // define association here
      UserPost.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      UserPost.belongsTo(models.Post, {
        foreignKey: "postId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  UserPost.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "UserPost",
      tableName: "Users_Posts",
      timestamps: true,
    }
  );
  return UserPost;
};
