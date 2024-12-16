const messageService = require("~/services/messageService");

class MessageController {
  async getMessages(req, res) {
    // id người nhận tin nhắn
    const receiverId = req.params.id;
    const user = req.user;

    const messages = await messageService.getMessages(receiverId, user);
    res.json(messages);
  }

  async getConversations(req, res) {
    const user = req.user;

    const conversations = await messageService.getConversations(user);

    res.json(conversations);
  }

  async createConversation(req, res) {
    const receiverId = req.body.receiverId;
    const senderId = req.user.id;

    const conversation = await messageService.createConversation(
      senderId,
      receiverId
    );

    res.json(conversation);
  }

  // tao conversation voi name
  async createConversationWithName(req, res) {
    const senderId = req.user.id;
    const name = req.body.name;

    const conversation = await messageService.createConversationWithName(
      senderId,
      name
    );

    res.json(conversation);
  }
}

module.exports = new MessageController();
