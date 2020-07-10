const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Post auntenticate user
exports.authUser = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extract to email & password
  const { email, password } = req.body;

  try {
    // check that user is registered
    let user = await User.findOne({ email });

    // validate user
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // check password is valid
    const validPassword = await bcryptjs.compare(password, user.password);

    // validate password
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // if all is valid
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
    console.log(error);
  }
};

// Get an authenticated user
exports.authenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({ user });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ msg: "Error detected" });
  }
};
