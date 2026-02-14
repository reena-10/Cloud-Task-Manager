const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// 1. GET ALL TASKS
router.get("/", async (req, res) => {
  try {
    const { secret } = req.query; // Frontend se aayi chabi

    if (!secret) return res.json([]);

    const tasks = await Task.find({ secretKey: secret });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 2. POST A NEW TASK
router.post("/", async (req, res) => {
  try {
    const { secret } = req.query;
    const newTask = new Task({
      title: req.body.title,
      secretKey: secret,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. DELETE ALL
router.delete("/", async (req, res) => {
  try {
    const { secret } = req.query;
    await Task.deleteMany({ secretKey: secret });
    res.json({ message: "Tasks cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Baki routes
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

router.patch("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  }
});

module.exports = router;
