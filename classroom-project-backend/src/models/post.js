"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Define associations here
      Post.belongsTo(models.Classroom, {
        foreignKey: "classroomId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Post.belongsToMany(models.User, {
        through: "Users_Posts",
        foreignKey: "postId",
      });

      Post.hasMany(models.Comment, {
        foreignKey: "postId",
      });
    }
  }

  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      classroomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Classrooms",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
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
      modelName: "Post",
      tableName: "Posts",
      timestamps: true,
    }
  );

  return Post;
};
