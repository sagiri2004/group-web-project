const userService = require("~/services/userService");

class UserController {
  async getMe(req, res) {
    try {
      const user = await userService.getMe(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
