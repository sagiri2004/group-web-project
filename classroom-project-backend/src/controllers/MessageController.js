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
}

module.exports = new MessageController();
