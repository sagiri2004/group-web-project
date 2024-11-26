const classroomService = require("../services/classroomService");

class ClassroomController {
  async getAll(req, res) {
    try {
      const userId = req.query.userId || req.body.userId; // Support both query and body
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const result = await classroomService.getAll(userId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { name, description, imageUrl } = req.body;
      if (!name) {
        return res.status(400).json({ error: "name is required" });
      }
      const result = await classroomService.create(name, description, imageUrl);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllClassrooms(req, res) {
    try {
      const result = await classroomService.getAllClassrooms();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ClassroomController();