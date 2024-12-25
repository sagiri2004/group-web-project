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
); // oke
// Nop bai cho assignment cua lop hoc
router.post(
  "/submit-assignment",
  authenticateToken,
  ClassroomController.submitAssignment
); // oke
// Lay ra assignment cua lop hoc
router.get(
  "/get-assignment/:assignmentId",
  authenticateToken,
  ClassroomController.getAssignment
); // oke

// Admin
// check is admin
router.get(
  "/check-is-admin/:classroomId",
  authenticateToken,
  ClassroomController.checkIsAdmin
); // oke
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
); // oke
// Lay ra cac bai nop cua assignment
router.post(
  "/list-submission/:assignmentId",
  authenticateToken,
  checkIsAdmin,
  ClassroomController.listSubmission
); // oke

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

// lay ra thong tin cua classroom
router.get(
  "/:classroomId",
  authenticateToken,
  ClassroomController.getClassroom
);

// lay ra so luong like cua post
router.get(
  "/get-like/:postId",
  authenticateToken,
  ClassroomController.getLikesPost
);

// like post
router.post("/like-post", authenticateToken, ClassroomController.likePost);

// unlike post
router.post("/unlike-post", authenticateToken, ClassroomController.unlikePost);

// lay ra tat ca cac comment cua post
router.get(
  "/list-comment/:postId",
  authenticateToken,
  ClassroomController.listComment
);

// them comment vao post
router.post("/add-comment", authenticateToken, ClassroomController.addComment);

// get all classroom co lien quan den user
router.get("/", authenticateToken, ClassroomController.getAllClassroom);

module.exports = router;
