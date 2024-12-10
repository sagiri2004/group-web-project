"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class FlashcardOrder extends Model {
    static associate(models) {
      FlashcardOrder.belongsTo(models.FlashcardSet, {
        foreignKey: "flashcardSetId",
        as: "flashcardSet",
      });

      FlashcardOrder.belongsTo(models.Flashcard, {
        foreignKey: "flashcardId",
        as: "flashcard",
      });
    }
  }

  FlashcardOrder.init(
    {
      flashcardSetId: {
        type: DataTypes.INTEGER,
        references: {
          model: "FlashcardSets",
          key: "id",
        },
        allowNull: false,
      },
      flashcardId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Flashcards",
          key: "id",
        },
        allowNull: false,
      },
      orderIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "FlashcardOrder",
      tableName: "FlashcardOrders",
    }
  );

  return FlashcardOrder;
};
