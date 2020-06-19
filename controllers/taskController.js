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

// Get task from a project
exports.getTasks = async (req, res) => {
  try {
    // Check if project exists
    const { project } = req.body;

    const projectExists = await Project.findById(project);

    if (!projectExists) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Check if the project belongs to auth user
    if (projectExists.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Get tasks
    const tasks = await Task.find({ project });

    res.json({ tasks });
  } catch (error) {
    console.log(error);

    res.status(500).send("Error");
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    // check if project exists
    const { project, name, state } = req.body;

    // check if task exists
    let taskExists = await Task.findById(req.params.id);

    if (!taskExists) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // find project
    const projectExists = await Project.findById(project);

    // Check if the project belongs to auth user
    if (projectExists.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // create a new object
    const newTask = {};

    if (name) newTask.name = name;

    if (state) newTask.state = state;

    // save taskExists
    taskExists = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });

    res.json({ taskExists });
  } catch (error) {
    console.log(error);

    res.status(500).send("Error");
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    // check if project exists
    const { project } = req.body;

    // check if task exists
    let taskExists = await Task.findById(req.params.id);

    if (!taskExists) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // find project
    const projectExists = await Project.findById(project);

    // Check if the project belongs to auth user
    if (projectExists.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Delete a task
    await Task.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Task removed" });
  } catch (error) {
    console.log(error);

    res.status(500).send("Error");
  }
};
