const mongoose = require("mongoose");

const UsersSqchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  date_recorded: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UsersSqchema);
