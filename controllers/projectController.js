const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createProject = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // create a new project
    const project = new Project(req.body);

    // save owner via JWT
    project.owner = req.user.id;

    // save project
    project.save();

    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error detected");
  }
};

// Get all projects from current user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({
      owner: -1,
    });
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error detected");
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // extract project information
  const { name } = req.body;
  const newProject = {};
  try {
  } catch (error) {
    console.log(error);
  }
};
