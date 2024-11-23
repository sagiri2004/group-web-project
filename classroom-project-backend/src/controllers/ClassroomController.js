const classroomService = require("~/services/classroomService");

class ClassroomController {
  async getAll(req, res) {
    const { userId } = req.body;
    const result = await classroomService.getAll(userId);
    res.json(result);
  }

  async create(req, res) {
    const { name, description, imageUrl } = req.body;
    const result = await classroomService.create(name, description, imageUrl);
    res.json(result);
  }

  async getAllClassrooms(req, res) {
    const result = await classroomService.getAllClassrooms();
    res.json(result);
  }
}

module.exports = new ClassroomController();