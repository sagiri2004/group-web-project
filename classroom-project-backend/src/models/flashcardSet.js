"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class FlashcardSet extends Model {
    static associate(models) {
      FlashcardSet.belongsToMany(models.Flashcard, {
        through: models.FlashcardOrder,
        foreignKey: "flashcardSetId",
        otherKey: "flashcardId",
        as: "flashcards",
      });
      FlashcardSet.belongsToMany(models.User, {
        through: models.FlashcardSetUser,
        foreignKey: "flashcardSetId",
        otherKey: "userId",
        as: "users",
      });
    }
  }

  FlashcardSet.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "FlashcardSet",
      tableName: "FlashcardSets",
    }
  );

  return FlashcardSet;
};
