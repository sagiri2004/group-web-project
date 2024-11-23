const express = require("express");
const router = express.Router();
const authController = require("~/controllers/ClassroomController");

router.get("/", authController.getAll);
router.post("/", authController.create);
router.get("/all", authController.getAllClassrooms);

module.exports = router;
