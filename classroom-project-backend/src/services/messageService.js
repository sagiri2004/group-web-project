require("dotenv").config();
const db = require("~/models");
const { Op } = require("sequelize");

function extractUsers(messages) {
  // Tạo một danh sách người dùng từ các tin nhắn
  const users = messages.map((message) => message.User);

  // Loại bỏ các bản ghi trùng lặp dựa trên ID của người dùng
  const uniqueUsers = users.filter(
    (user, index, self) => index === self.findIndex((u) => u.id === user.id)
  );

  return uniqueUsers;
}

async function getMessages(receiverId, user) {
  try {
    const conversationId = await db.Conversation.findOne({
      where: {
        [Op.or]: [
          { senderId: user.id, receiverId },
          { senderId: receiverId, receiverId: user.id },
        ],
      },
    });

    if (!conversationId) {
      return null;
    }

    const messages = await db.Message.findAll({
      where: {
        conversationId: conversationId.id,
      },
      include: {
        model: db.User,
        attributes: ["id", "username", "avatar"],
      },
      order: [["timestamp", "ASC"]],
    });

    return messages;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getConversations(user) {
  try {
    const conversations = await db.Conversation.findAll({
      where: {
        [Op.or]: [{ senderId: user.id }, { receiverId: user.id }],
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "username", "avatar", "name"],
        },
        {
          model: db.User,
          attributes: ["id", "username", "avatar", "name"],
        },
      ],
    });

    // extract users from conversations
    const users = extractUsers(conversations);

    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  getMessages,
  getConversations,
};
