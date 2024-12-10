"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("FlashcardOrders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      flashcardSetId: {
        type: Sequelize.INTEGER,
        references: {
          model: "FlashcardSets",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      flashcardId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Flashcards",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      orderIndex: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("FlashcardOrders");
  },
};
