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
