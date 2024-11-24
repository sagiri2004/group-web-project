const express = require("express");
const router = express.Router();
const messageController = require("~/controllers/MessageController");
const authenticateToken = require("~/middlewares/authenticateToken");

router.get("/:id", authenticateToken, messageController.getMessages);
router.get("/", authenticateToken, messageController.getConversations);

module.exports = router;
