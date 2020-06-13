const express = require("express");
const router = express.Router();
const projectControllter = require("../controllers/projectController");

// Create projects-> api/projects
router.post("/", projectControllter.createProject);

module.exports = router;
