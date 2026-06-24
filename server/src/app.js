const express = require("express");
const cors = require("cors");

const bfhlRoutes = require("./routes/bfhl.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BFHL API is running",
  });
});

app.use("/bfhl", bfhlRoutes);

module.exports = app;