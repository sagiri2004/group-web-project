const express = require("express");
const router = express.Router();
const authController = require("~/controllers/AuthController");
const authenticateToken = require("~/middleware/authenticateToken");

router.post("/login", authController.login);
router.post("/logout", authenticateToken, authController.logout);

module.exports = router;