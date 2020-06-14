const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

// Create projects-> api/projects
router.post(
  "/",
  [check("name", "Project name is required").not().isEmpty()],
  auth,
  projectController.createProject
);

router.get("/", auth, projectController.createProject);

module.exports = router;
