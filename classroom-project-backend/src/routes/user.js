const express = require("express");
const router = express.Router();
const userController = require("~/controllers/UserController");
const authenticateToken = require("~/middlewares/authenticateToken");

router.get("/me", authenticateToken, userController.getMe);
// find user by name
router.post("/find", authenticateToken, userController.findUserByName);

module.exports = router;
