const express = require("express");
const router = express.Router();
const userController = require("~/controllers/UserController");
const authenticateToken = require("~/middlewares/authenticateToken");

router.get("/me", authenticateToken, userController.getMe);

module.exports = router;
