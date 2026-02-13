const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

// 1. MIDDLEWARE
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Simple Cloud Task Manager API! Server is running.");
});

// 2. ROUTES
app.use("/api/tasks", taskRoutes);

// 3. DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    console.log("✅ DATABASE CONNECTED SUCCESSFULLY");
  })
  .catch((err) => {
    console.error("❌ Connection failed:", err.message);
  });

// 4. SERVER INITIALIZATION
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
