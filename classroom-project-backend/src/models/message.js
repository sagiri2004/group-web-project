"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // Liên kết với User (người gửi)
      Message.belongsTo(models.User, {
        foreignKey: "senderId",
      });

      // Liên kết với Conversation
      Message.belongsTo(models.Conversation, {
        foreignKey: "conversationId",
      });
    }
  }

  Message.init(
    {
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Conversations",
          key: "id",
        },
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
      tableName: "Messages",
      timestamps: true,
    }
  );

  return Message;
};
