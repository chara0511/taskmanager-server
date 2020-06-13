const express = require("express");
const connectDB = require("./config/database");

// Create server
const app = express();

// Connect to DB
connectDB();

// Enable express.json
app.use(express.json({ extended: true }));

// App port
const PORT = process.env.PORT || 4000;

// Import routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));

// Start app
app.listen(PORT, () => {
  console.log(`Server listen in port ${PORT}`);
});
