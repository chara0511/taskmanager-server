const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");

// create a task => api/tasks
router.post(
  "/",
  auth,
  [check("name", "Name is required").not().isEmpty()],
  taskController.createTask
);

module.exports = router;
