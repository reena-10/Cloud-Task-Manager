require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); //
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// 1. MIDDLEWARE
// app.use(cors()) must come BEFORE your routes
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Cloud Task Manager API! The server is running successfully.",
  );
});

// 2. ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", taskRoutes);

// 3. DATABASE CONNECTION
// Using family: 4 as a safety net for local environments
mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    console.log("✅ DATABASE CONNECTED SUCCESSFULLY");
  })
  .catch((err) => {
    console.error("❌ Connection failed. Detailed Error:", err.message);
  });

// 4. SERVER INITIALIZATION
// Render uses process.env.PORT automatically
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
