const express = require("express");
const cors = require("cors");

const bfhlRoutes = require("./routes/bfhl.route");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/bfhl", bfhlRoutes);

// Health Check Route (optional)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BFHL API is running",
  });
});

module.exports = app;