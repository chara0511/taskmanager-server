const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");

// Create a new task
exports.createTask = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
};
