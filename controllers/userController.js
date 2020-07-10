const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

    // create JWT
    const payload = {
      user: { id: user.id },
    };

    // sign JWT
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        // confirm message
        res.json({ token: token });
      }
    );
  } catch (error) {
    //console.log(error);

    res.status(400).send("something went wrong");
  }
};
