const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    let user;

    // create a new user
    user = new User(req.body);

    // save a user
    await user.save();

    // message
    res.send("user created");
  } catch (error) {
    console.log(error);

    res.status(400).send("something went wrong");
  }
};
