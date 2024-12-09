const db = require("../models");

async function checkIsAdmin(req, res, next) {
  const user = req.user;
  const { classroomId } = req.body;

  // neu khong co trong body thi lay tu params
  if (!classroomId) {
    classroomId = req.params.classroomId;
  }

  // check user is admin of classroom
  const userClassroom = await db.UserClassroom.findOne({
    where: {
      userId: user.id,
      classroomId,
      isAdmin: true,
    },
  });

  console.log(userClassroom);

  if (!userClassroom) {
    return res.status(403).json({
      message: "User is not admin of classroom",
    });
  }

  next();
}

module.exports = checkIsAdmin;
