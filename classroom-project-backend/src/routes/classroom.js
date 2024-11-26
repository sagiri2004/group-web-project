const express = require("express");
const router = express.Router();
const ClassroomController = require("../controllers/ClassroomController");

router.get("/api/classroom", ClassroomController.getAll);
router.post("/api/classroom", ClassroomController.create);
router.get("/api/classroom/all", ClassroomController.getAllClassrooms);

module.exports = router;