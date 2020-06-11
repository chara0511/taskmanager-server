const User = require("../models/User");

exports.createUser = async (req, res) => {
  // destructuring in email & password
  const { email, password } = req.body;

  try {
    // check that email is unique
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "Existing user mail" });
    }
    // create a new user
    user = new User(req.body);

    // save a user
    await user.save();

    // message
    res.json({ msg: "User created" });
  } catch (error) {
    console.log(error);

    res.status(400).send("something went wrong");
  }
};
