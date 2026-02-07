const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// 1. GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// 2. POST a new task
router.post("/", async (req, res) => {
  const newTask = new Task({ title: req.body.title });
  await newTask.save();
  res.json(newTask);
});

// 3. DELETE ALL (Fix: Must be above /:id)
router.delete("/", async (req, res) => {
  try {
    await Task.deleteMany({});
    res.status(200).json({ message: "All tasks cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. DELETE ONE
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. PATCH (Toggle)
router.patch("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

module.exports = router;
