const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/tasks", taskRoutes); // Tasks ka rasta

// ROOT ROUTE (Sirf check karne ke liye)
app.get("/", (req, res) => {
  res.send("Server is running! Use /api/tasks to get data.");
});

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log("✅ DATABASE CONNECTED"))
  .catch((err) => console.error("❌ Connection failed:", err.message));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
