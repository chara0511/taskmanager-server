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

  try {
    // Check if project exists
    const { project } = req.body;

    const projectExists = await Project.findById(project);

    if (!projectExists) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Check if the project belongs to authenticated user
    if (projectExists.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Create task
    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};
