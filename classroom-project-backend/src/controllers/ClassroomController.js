const classroomService = require("../services/classroomService");

class ClassroomController {
  async joinClassroom(req, res) {
    const user = req.user;
    const { classroomId } = req.body;

    try {
      const result = await classroomService.joinClassroom(user, classroomId);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async leaveClassroom(req, res) {
    const user = req.user;
    const { classroomId } = req.body;

    try {
      const result = await classroomService.leaveClassroom(user, classroomId);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async listClassroom(req, res) {
    const user = req.user;

    try {
      const result = await classroomService.listClassroom(user);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async createClassroom(req, res) {
    const user = req.user;
    const { name, description, imageUrl } = req.body;

    try {
      const result = await classroomService.createClassroom(
        user,
        name,
        description,
        imageUrl
      );

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async deleteClassroom(req, res) {
    const user = req.user;
    const { classroomId } = req.body;

    try {
      const result = await classroomService.deleteClassroom(user, classroomId);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async listCreated(req, res) {
    const user = req.user;

    try {
      const result = await classroomService.listCreated(user);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async removeUser(req, res) {
    const user = req.user;
    const { classroomId, userId } = req.body;

    try {
      const result = await classroomService.removeUser(
        user,
        classroomId,
        userId
      );

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async listUser(req, res) {
    const user = req.user;
    const { classroomId } = req.params;

    try {
      const result = await classroomService.listUsers(user, classroomId);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async addAssignment(req, res) {
    const user = req.user;
    const { classroomId, title, description, dueDate } = req.body;

    try {
      const result = await classroomService.addAssignment(
        user,
        classroomId,
        title,
        description,
        dueDate
      );

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async listAssignment(req, res) {
    const user = req.user;
    const { classroomId } = req.params;

    try {
      const result = await classroomService.listAssignment(user, classroomId);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async submitAssignment(req, res) {
    const user = req.user;
    const { assignmentId, content } = req.body;

    try {
      const result = await classroomService.submitAssignment(
        user,
        assignmentId,
        content
      );

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async getAssignment(req, res) {
    const user = req.user;
    const { assignmentId } = req.params;

    try {
      const result = await classroomService.getAssignment(user, assignmentId);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async listSubmission(req, res) {
    const user = req.user;
    const { assignmentId } = req.params;
    const { classroomId } = req.body;

    try {
      const result = await classroomService.listSubmission(
        user,
        assignmentId,
        classroomId
      );

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async createPost(req, res) {
    const user = req.user;
    const { classroomId, title, content } = req.body;

    try {
      const result = await classroomService.createPost(
        user,
        classroomId,
        title,
        content
      );

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async listPost(req, res) {
    const user = req.user;
    const { classroomId } = req.params;

    try {
      const result = await classroomService.listPost(user, classroomId);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async deletePost(req, res) {
    const user = req.user;
    const { postId } = req.params;

    try {
      const result = await classroomService.deletePost(user, postId);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async checkIsAdmin(req, res) {
    const user = req.user;
    const { classroomId } = req.params;

    try {
      const result = await classroomService.checkIsAdmin(user, classroomId);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async getClassroom(req, res) {
    const user = req.user;
    const { classroomId } = req.params;

    try {
      const result = await classroomService.getClassroom(user, classroomId);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  // get all classroom co lien quan den user
  async getAllClassroom(req, res) {
    try {
      const user = req.user;

      const result = await classroomService.getAllClassroom(user);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = new ClassroomController();
