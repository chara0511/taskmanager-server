const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");

// create a task => api/tasks
router.post(
  "/",
  auth,
  [
    check("name", "Name is required").not().isEmpty(),
    check("project", "Project is required").not().isEmpty(),
  ],
  taskController.createTask
);

// Get tasks from a project
router.get("/", auth, taskController.getTasks);

// Update task
router.put("/:id", auth, taskController.updateTask);

module.exports = router;
