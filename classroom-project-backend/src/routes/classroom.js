const express = require("express");
const router = express.Router();
const ClassroomController = require("../controllers/ClassroomController");
const authenticateToken = require("../middlewares/authenticateToken");
const checkIsAdmin = require("../middlewares/checkIsAdmin");

// User
// Tham gia vao lop hoc
router.post("/join", authenticateToken, ClassroomController.joinClassroom); //oke
// Roi khoi lop hoc
router.post("/leave", authenticateToken, ClassroomController.leaveClassroom); //oke
// Lay ra tat cac cac danh sach lop hoc ma user tham gia
router.get("/list", authenticateToken, ClassroomController.listClassroom); // oke
// Lay ra tat ca cac assignment cua lop hoc
router.get(
  "/list-assignment/:classroomId",
  authenticateToken,
  ClassroomController.listAssignment
);
// Nop bai cho assignment cua lop hoc
router.post(
  "/submit-assignment",
  authenticateToken,
  ClassroomController.submitAssignment
);
// Lay ra assignment cua lop hoc
router.get(
  "/get-assignment/:assignmentId",
  authenticateToken,
  ClassroomController.getAssignment
);

// Admin
// Tao lop hoc
router.post("/create", authenticateToken, ClassroomController.createClassroom); // oke
// Xoa lop hoc
router.delete(
  "/delete",
  authenticateToken,
  ClassroomController.deleteClassroom
); // oke
// Lay ra tat ca cac lop hoc ma user tao
router.get("/list-created", authenticateToken, ClassroomController.listCreated); // oke
// Xoa user khoi lop hoc
router.post(
  "/remove-user",
  authenticateToken,
  checkIsAdmin,
  ClassroomController.removeUser
); // oke
// Lay ra tat ca cac user trong lop hoc
router.get(
  "/list-user/:classroomId",
  authenticateToken,
  checkIsAdmin,
  ClassroomController.listUser
); // oke
// Them Assignment
router.post(
  "/add-assignment",
  authenticateToken,
  checkIsAdmin,
  ClassroomController.addAssignment
);
// Lay ra cac bai nop cua assignment
router.get(
  "/list-submission/:assignmentId",
  authenticateToken,
  checkIsAdmin,
  ClassroomController.listSubmission
);
// Tao post trong lop hoc
router.post("/create-post", authenticateToken, ClassroomController.createPost);
// Lay ra tat ca cac post trong lop hoc
router.get(
  "/list-post/:classroomId",
  authenticateToken,
  ClassroomController.listPost
);
// Xoa post trong lop hoc
router.delete(
  "/delete-post/:postId",
  authenticateToken,
  ClassroomController.deletePost
);

module.exports = router;
