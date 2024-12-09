const db = require("~/models");
const { Op } = require("sequelize");

async function joinClassroom(user, classroomId) {
  const classroom = await db.Classroom.findByPk(classroomId);

  if (!classroom) {
    throw new Error("Classroom not found");
  }

  // check user is already in classroom
  const userClassroom = await db.UserClassroom.findOne({
    where: {
      userId: user.id,
      classroomId,
    },
  });

  if (userClassroom) {
    throw new Error("User already in classroom");
  }

  await db.UserClassroom.create({
    userId: user.id,
    classroomId,
  });

  return {
    message: "Join classroom successfully",
  };
}

async function leaveClassroom(user, classroomId) {
  const classroom = await db.Classroom.findByPk(classroomId);

  if (!classroom) {
    throw new Error("Classroom not found");
  }

  // check user is already in classroom
  const userClassroom = await db.UserClassroom.findOne({
    where: {
      userId: user.id,
      classroomId,
    },
  });

  if (!userClassroom) {
    throw new Error("User not in classroom");
  }

  await userClassroom.destroy();

  return {
    message: "Leave classroom successfully",
  };
}

// oke
async function listClassroom(user) {
  const userClassrooms = await db.UserClassroom.findAll({
    where: {
      userId: user.id,
    },
    include: db.Classroom,
  });

  const classrooms = userClassrooms.map((item) => {
    const { id, name, description, imageUrl } = item.Classroom;
    return { id, name, description, imageUrl };
  });

  return {
    data: classrooms,
    message: "List classroom successfully",
  };
}

// oke
async function createClassroom(user, name, description, imageUrl) {
  try {
    const [classroom, created] = await db.Classroom.findOrCreate({
      where: { name },
      defaults: { description, imageUrl },
    });

    if (!created) {
      await classroom.update({ description, imageUrl });
    }

    await db.UserClassroom.findOrCreate({
      where: {
        userId: user.id,
        classroomId: classroom.id,
      },
      defaults: {
        isAdmin: true,
      },
    });

    return {
      message: created
        ? "Create classroom successfully"
        : "Update classroom successfully",
      data: { classroom },
    };
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
}

// oke
async function deleteClassroom(user, classroomId) {
  const classroom = await db.Classroom.findByPk(classroomId);

  if (!classroom) {
    throw new Error("Classroom not found");
  }

  // check user is admin of classroom
  const userClassroom = await db.UserClassroom.findOne({
    where: {
      userId: user.id,
      classroomId,
      isAdmin: true,
    },
  });

  if (!userClassroom) {
    throw new Error("User is not admin of classroom");
  }

  await classroom.destroy();

  return {
    message: "Delete classroom successfully",
  };
}

// oke
async function listCreated(user) {
  const userClassrooms = await db.UserClassroom.findAll({
    where: {
      userId: user.id,
      isAdmin: true,
    },
    include: db.Classroom,
  });

  const classrooms = userClassrooms.map((item) => {
    const { id, name, description, imageUrl } = item.Classroom;
    return { id, name, description, imageUrl };
  });

  return {
    data: classrooms,
    message: "List created classroom successfully",
  };
}

// oke
async function removeUser(user, classroomId, userId) {
  const classroom = await db.Classroom.findByPk(classroomId);

  if (!classroom) {
    throw new Error("Classroom not found");
  }

  // check user is admin of classroom
  const userClassroom = await db.UserClassroom.findOne({
    where: {
      userId: user.id,
      classroomId,
      isAdmin: true,
    },
  });

  if (!userClassroom) {
    throw new Error("User is not admin of classroom");
  }

  const removedUserClassroom = await db.UserClassroom.findOne({
    where: {
      userId,
      classroomId,
    },
  });

  if (!removedUserClassroom) {
    throw new Error("User not in classroom");
  }

  await removedUserClassroom.destroy();

  return {
    message: "Remove user successfully",
  };
}

async function listUsers(classroomId) {
  const users = await db.UserClassroom.findAll({
    where: {
      classroomId,
    },
    include: db.User,
  });

  const data = users.map((item) => {
    const { id, username, name, avatar } = item.User;
    return { id, username, name, avatar };
  });

  return {
    data,
    message: "List users successfully",
  };
}

async function addAssignment(user, classroomId, title, description, deadline) {
  const classroom = await db.Classroom.findByPk(classroomId);

  if (!classroom) {
    throw new Error("Classroom not found");
  }

  // check user is admin of classroom
  const userClassroom = await db.UserClassroom.findOne({
    where: {
      userId: user.id,
      classroomId,
      isAdmin: true,
    },
  });

  if (!userClassroom) {
    throw new Error("User is not admin of classroom");
  }

  const assignment = await db.Assignment.create({
    classroomId,
    title,
    description,
    deadline,
  });

  return {
    data: { assignment },
    message: "Add assignment successfully",
  };
}

async function listAssignment(user, classroomId) {
  const classroom = await db.Classroom.findByPk(classroomId);

  if (!classroom) {
    throw new Error("Classroom not found");
  }

  // Lấy ra tất cả assignments của lớp học
  const assignments = await db.Assignment.findAll({
    where: { classId: classroomId },
    include: [
      {
        model: db.UserAssignment,
        where: { userId: user.id }, // Lọc những assignment đã nộp của user
        required: false, // Cho phép lấy assignments chưa nộp
      },
    ],
  });

  // Lấy ngày hiện tại để so sánh hạn chót
  const currentDate = new Date();

  // Xử lý dữ liệu assignments để thêm thông tin về trạng thái nộp bài
  const result = assignments.map((assignment) => {
    // Kiểm tra xem assignment có tồn tại trong UserAssignment hay không (nghĩa là user đã nộp hay chưa)
    const userAssignment = assignment.UserAssignments
      ? assignment.UserAssignments[0]
      : null;

    // Kiểm tra xem bài đã nộp đúng hạn chưa
    const isSubmittedOnTime = userAssignment
      ? new Date(userAssignment.updatedAt) <= new Date(assignment.dueDate)
      : false;

    return {
      id: assignment.id,
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      // Nếu đã nộp bài
      isSubmitted: userAssignment !== null,
      isOnTime: isSubmittedOnTime,
      // Số ngày còn lại cho đến khi hết hạn (nếu chưa hết hạn)
      daysLeft:
        currentDate < new Date(assignment.dueDate)
          ? Math.ceil(
              (new Date(assignment.dueDate) - currentDate) / (1000 * 3600 * 24)
            )
          : 0,
    };
  });

  return result;
}

async function submitAssignment(user, assignmentId, content) {
  const assignment = await db.Assignment.findByPk(assignmentId);

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  const userClassroom = await db.UserClassroom.findOne({
    where: {
      userId: user.id,
      classroomId: assignment.classroomId,
    },
  });

  if (!userClassroom) {
    throw new Error("User not in classroom");
  }

  const submission = await db.Submission.create({
    assignmentId,
    userId: user.id,
    content,
  });

  return {
    data: { submission },
    message: "Submit assignment successfully",
  };
}

async function getAssignment(user, assignmentId) {
  const assignment = await db.Assignment.findByPk(assignmentId);

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  // them cac truong de check xem user da nop bai chua, nop dung han hay muon
  const userSubmission = await db.userAssignment.findOne({
    where: {
      assignmentId,
      userId: user.id,
    },
  });

  const data = {
    id: assignment.id,
    title: assignment.title,
    description: assignment.description,
    deadline: assignment.deadline,
    userSubmission: userSubmission
      ? {
          content: userSubmission.content,
          status: userSubmission.status,
        }
      : null,
  };

  return {
    data,
    message: "Get assignment successfully",
  };
}

async function listSubmission(user, assignmentId) {
  const assignment = await db.Assignment.findByPk(assignmentId);

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  const submissions = await db.addAssignment.findAll({
    where: {
      assignmentId,
    },

    include: db.User,
  });

  // them cac truong de phan biet nop muon hay dung han
  const data = submissions.map((item) => {
    const { id, content, createdAt, User } = item;
    return {
      id,
      content,
      createdAt,
      User: {
        id: User.id,
        username: User.username,
        name: User.name,
        avatar: User.avatar,
      },
    };
  });

  return {
    data,
    message: "List submission successfully",
  };
}

async function createPost(user, classroomId, title, content) {
  const classroom = await db.Classroom.findByPk(classroomId);

  if (!classroom) {
    throw new Error("Classroom not found");
  }

  const userClassroom = await db.UserClassroom.findOne({
    where: {
      userId: user.id,
      classroomId,
    },
  });

  if (!userClassroom) {
    throw new Error("User not in classroom");
  }

  const post = await db.Post.create({
    classId: classroomId,
    userId: user.id,
    title,
    content,
  });

  return {
    data: { post },
    message: "Create post successfully",
  };
}

async function listPost(user, classroomId) {
  const posts = await db.Post.findAll({
    where: {
      classId: classroomId,
    },
    include: db.User,
  });

  const data = posts.map((item) => {
    const { id, title, content, createdAt, User } = item;
    return {
      id,
      title,
      content,
      createdAt,
      User: {
        id: User.id,
        username: User.username,
        name: User.name,
        avatar: User.avatar,
      },
    };
  });

  return {
    data,
    message: "List post successfully",
  };
}

async function deletePost(user, postId) {
  const post = await db.Post.findByPk(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  const userPost = await db.UserPost.findOne({
    where: {
      userId: user.id,
      postId,
    },
  });

  // Neu la nguoi dung tao ra post thi co the xoa va admin cung co the xoa
  // check user is admin of classroom
  const userClassroom = await db.UserClassroom.findOne({
    where: {
      userId: user.id,
      classroomId: post.classId,
      isAdmin: true,
    },
  });

  if (!userPost && !userClassroom) {
    throw new Error("User is not author of post");
  }

  await post.destroy();

  return {
    message: "Delete post successfully",
  };
}

module.exports = {
  joinClassroom,
  leaveClassroom,
  listClassroom,
  createClassroom,
  deleteClassroom,
  listCreated,
  removeUser,
  listUsers,
  addAssignment,
  listAssignment,
  submitAssignment,
  getAssignment,
  listSubmission,
  createPost,
  listPost,
  deletePost,
};
