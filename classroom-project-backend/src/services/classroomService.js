const db = require("~/models");
const { Op } = require("sequelize");

function formatRelativeTime(createdAt) {
  const now = new Date();
  const postTime = new Date(createdAt);
  const diffInMs = now - postTime;
  const diffInMinutes = Math.floor(diffInMs / 60000);

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} days ago`;
  }
}

// fix
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
    data: { classroom },
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

// oke // lai ko oke r
async function listClassroom(user) {
  const userClassrooms = await db.UserClassroom.findAll({
    where: {
      userId: user.id,
      isAdmin: false,
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

async function listUsers(user, classroomId) {
  // lay ra toan bo user trong lop hoc va lay ra ca so luong bai nop cua tung user va tong so assignment
  // van tra ve user neu user chua nop bai
  const users = await db.UserClassroom.findAll({
    where: {
      classroomId,
    },
    include: [
      db.User,
      {
        model: db.UserAssignment,
        include: db.Assignment,
      },
    ],
  });

  const data = users.map((item) => {
    const { User, UserAssignments } = item;
    return {
      id: User.id,
      username: User.username,
      name: User.name,
      avatar: User.avatar,
      assignmentCount: UserAssignments.length,
      isAdmin: item.isAdmin,
      UserAssignments,
    };
  });

  return {
    data,
    message: "List users successfully",
  };
}

async function addAssignment(user, classroomId, title, description, dueDate) {
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
    classId: classroomId,
    title,
    description,
    dueDate,
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

  return {
    data: result,
    message: "List assignment successfully",
  };
}

async function submitAssignment(user, assignmentId, content) {
  const assignment = await db.Assignment.findByPk(assignmentId);

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  const userClassroom = await db.UserClassroom.findOne({
    where: {
      userId: user.id,
      classroomId: assignment.classId,
    },
  });

  if (!userClassroom) {
    throw new Error("User not in classroom");
  }

  // check neu da nop truoc do thi chi update content
  let userAssignment;

  try {
    userAssignment = await db.UserAssignment.findOne({
      where: {
        assignmentId,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Error finding user assignment:", error);
    throw new Error("Error finding user assignment");
  }

  if (userAssignment) {
    await userAssignment.update({ content });
  }

  // Neu chua nop thi tao moi
  if (!userAssignment) {
    await db.UserAssignment.create({
      assignmentId,
      userId: user.id,
      content,
    });
  }

  return {
    data: { assignment },
    message: "Submit assignment successfully",
  };
}

async function getAssignment(user, assignmentId) {
  const assignment = await db.Assignment.findByPk(assignmentId);

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  // them cac truong de check xem user da nop bai chua, nop dung han hay muon
  let userSubmission;
  try {
    userSubmission = await db.UserAssignment.findOne({
      where: {
        assignmentId,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Error finding user assignment:", error);
    throw new Error("Error finding user assignment");
  }

  const data = {
    id: assignment.id,
    title: assignment.title,
    description: assignment.description,
    dueDate: assignment.dueDate,
    isSubmitted: userSubmission !== null,
    isOnTime:
      userSubmission &&
      new Date(userSubmission.updatedAt) <= new Date(assignment.dueDate),
    content: userSubmission ? userSubmission.content : null,
  };

  return {
    data,
    message: "Get assignment successfully",
  };
}

async function listSubmission(user, assignmentId, classroomId) {
  try {
    const assignment = await db.Assignment.findByPk(assignmentId);

    if (!assignment) {
      throw new Error("Assignment not found");
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

    const submissions = await db.UserAssignment.findAll({
      where: {
        assignmentId,
      },
      include: db.User,
    });

    const userSubmission = submissions.map((item) => {
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

    // Lay ra so luong user da nop bai, tong user trong lop
    const totalUser = await db.UserClassroom.count({
      where: {
        classroomId,
      },
    });

    const totalSubmitted = await db.UserAssignment.count({
      where: {
        assignmentId,
      },
    });

    return {
      data: {
        assignment,
        userSubmission,
        totalSubmitted,
        totalUser,
      },
      message: "List submission successfully",
    };
  } catch (error) {
    console.error("Error listing submissions:", error);
    throw new Error("Error listing submissions");
  }
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
    classroomId,
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
      classroomId,
    },
    include: db.User,
  });

  const data1 = posts.map((item) => {
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

  // chuyen ve dang
  //   <PostDisplayComponent
  //   title="Check out this amazing view!"
  //   content="<p>This place is so beautiful. Highly recommend visiting!</p>"
  //   avatar="https://via.placeholder.com/150"
  //   name="John Doe"
  //   username="johndoe"
  //   time="2h"
  // />

  const data = data1.map((item) => {
    const { id, title, content, createdAt, User } = item;
    const time = formatRelativeTime(createdAt); // Thời gian tương đối
    return {
      id,
      title,
      content,
      createdAt,
      username: User.username,
      name: User.name,
      avatar: User.avatar,
      time, // Thời gian đã format
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

async function checkIsAdmin(user, classroomId) {
  const userClassroom = await db.UserClassroom.findOne({
    where: {
      userId: user.id,
      classroomId,
      isAdmin: true,
    },
  });

  if (!userClassroom) {
    return {
      message: "User is not admin of classroom",
      isAdmin: false,
    };
  }

  return {
    message: "User is admin of classroom",
    isAdmin: true,
  };
}

async function getClassroom(user, classroomId) {
  const classroom = await db.Classroom.findByPk(classroomId);

  if (!classroom) {
    throw new Error("Classroom not found");
  }

  return {
    data: { classroom },
    message: "Get classroom successfully",
  };
}

async function getAllClassroom(user) {
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
    message: "Get all classroom successfully",
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
  checkIsAdmin,
  getClassroom,
  getAllClassroom,
};
