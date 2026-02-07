require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

// The Permanent Fix: No extra options needed for newer Mongoose,
// just the URI and the family:4 safety net.
mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    console.log("✅ DATABASE CONNECTED SUCCESSFULLY");
    console.log("🚀 Server: http://localhost:3000");
  })
  .catch((err) => {
    console.error("❌ Connection failed. Detailed Error:", err.message);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT);
