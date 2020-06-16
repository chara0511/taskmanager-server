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

// Update a project by id
exports.updateProject = async (req, res) => {
  // check validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // extract project information
  const { name } = req.body;

  const newProject = {};

  if (name) {
    newProject.name = name;
  }

  try {
    // check id
    let project = await Project.findById(req.params.id);

    // check if project exists
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // check project owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // update
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );

    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// Delete a project by id
exports.deleteProject = async (req, res) => {
  try {
    // check id
    let project = await Project.findById(req.params.id);

    // check if project exists
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // check project owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // delete
    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Project removed" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error detected on server");
  }
};
