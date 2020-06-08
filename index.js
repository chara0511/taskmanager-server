const express = require("express");
const connectDB = require("./config/database");

// Create server
const app = express();

// Connect to DB
connectDB();

// App port
const PORT = process.env.PORT || 4000;

// Start app
app.listen(PORT, () => {
  console.log(`Server listen in port ${PORT}`);
});
