const express = require("express");
const router = express.Router();
const adminController = require("~/controllers/AdminController");
const checkIsGod = require("~/middlewares/checkIsGod");
const authenticateToken = require("../middlewares/authenticateToken");

// Get all users
router.get("/", authenticateToken, checkIsGod, adminController.getAllUsers);

// Get user by ID
router.get("/:id", authenticateToken, checkIsGod, adminController.getUserById);

// Create a new user
router.post("/", authenticateToken, checkIsGod, adminController.createUser);

// Update user
router.put("/:id", authenticateToken, checkIsGod, adminController.updateUser);

// Delete user
router.delete(
  "/:id",
  authenticateToken,
  checkIsGod,
  adminController.deleteUser
);

// Change user status
router.patch(
  "/:id/status",
  authenticateToken,
  checkIsGod,
  adminController.updateUserStatus
);

module.exports = router;
