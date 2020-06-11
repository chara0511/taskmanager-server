const User = require("../models/User");
const bcryptjs = require("bcryptjs");

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

    // hash password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // save a user
    await user.save();

    // message
    res.json({ msg: "User created" });
  } catch (error) {
    console.log(error);

    res.status(400).send("something went wrong");
  }
};
