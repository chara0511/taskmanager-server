const Project = (require = require("../models/Project"));

exports.createProject = async (req, res) => {
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
