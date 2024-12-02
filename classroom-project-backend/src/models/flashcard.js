"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Flashcard extends Model {
    static associate(models) {
      Flashcard.belongsToMany(models.FlashcardSet, {
        through: models.FlashcardOrder,
        foreignKey: "flashcardId",
        otherKey: "flashcardSetId",
        as: "flashcardSets",
      });
    }
  }

  Flashcard.init(
    {
      word: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      definition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Flashcard",
    }
  );

  return Flashcard;
};
