// Routes to auth users
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");

// Log in user -> api/auth
router.post("/", authController.authUser);

// Get auth user
router.get("/", auth, authController.authenticatedUser);

module.exports = router;
