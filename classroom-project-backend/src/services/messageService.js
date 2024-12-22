require("dotenv").config();
const db = require("~/models");
const { Op } = require("sequelize");

function extractUsers(messages) {
  // Tạo một danh sách người dùng từ các tin nhắn
  const users = messages.map((message) => message.User);

  // console.log(users);

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
    // const conversations = await db.Conversation.findAll({
    //   where: {
    //     [Op.or]: [{ senderId: user.id }, { receiverId: user.id }],
    //   },
    //   include: [
    //     {
    //       model: db.User,
    //       attributes: ["id", "username", "avatar", "name"],
    //     },
    //     {
    //       model: db.User,
    //       attributes: ["id", "username", "avatar", "name"],
    //     },
    //   ],
    // });

    // khong chi lay ra ma con sap xep theo timestamp cua message moi nhat

    const conversations = await db.Conversation.findAll({
      where: {
        [Op.or]: [{ senderId: user.id }, { receiverId: user.id }],
      },
    });

    // loc ra toan bo id cua nguoi dung trong cac conversation
    const userIds = conversations.map((conversation) => {
      if (conversation.senderId === user.id) {
        return conversation.receiverId;
      }
      return conversation.senderId;
    });

    // loai bo cac id trung lap
    const uniqueUserIds = userIds.filter(
      (userId, index, self) => index === self.indexOf(userId)
    );

    // tim ra toan bo user tu cac id da loc
    const users = await db.User.findAll({
      where: {
        id: uniqueUserIds,
      },
      attributes: ["id", "username", "avatar", "name"],
    });

    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function createConversation(senderId, receiverId) {
  try {
    let conversation = await db.Conversation.findOne({
      where: {
        [Op.or]: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
    });

    if (!conversation) {
      conversation = await db.Conversation.create({ senderId, receiverId });
    }

    return conversation;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function createConversationWithName(senderId, name) {
  try {
    // tim user co name trung voi name
    const receiver = await db.User.findOne({
      where: {
        name,
      },
    });

    if (!receiver) {
      // tra ve message loi neu khong tim thay user
      return { message: "User not found" };
    }

    // tao conversation
    const conversation = await createConversation(senderId, receiver.id);

    // tra ve toan bo conversations da tao
    const conversations = await db.Conversation.findAll({
      where: {
        [Op.or]: [{ senderId }, { receiverId }],
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
  createConversation,
  createConversationWithName,
};
