"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      // Liên kết với User
      Conversation.belongsTo(models.User, {
        foreignKey: "senderId",
      });
      Conversation.belongsTo(models.User, {
        foreignKey: "receiverId",
      });

      // Liên kết với Messages
      Conversation.hasMany(models.Message, {
        foreignKey: "conversationId",
      });
    }
  }

  Conversation.init(
    {
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Conversation",
      tableName: "Conversations",
      timestamps: true,
    }
  );

  return Conversation;
};
