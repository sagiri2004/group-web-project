const express = require("express");
const router = express.Router();
const searchController = require("~/controllers/SearchController");

router.get("/", searchController.search);

module.exports = router;
