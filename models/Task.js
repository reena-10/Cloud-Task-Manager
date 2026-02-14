const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  secretKey: { type: String, required: true }, // Isse privacy bani rahegi
});

module.exports = mongoose.model("Task", TaskSchema);
