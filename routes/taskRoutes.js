const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// 1. GET ALL TASKS
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks); // Ye hamesha Array [] return karega
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. POST A NEW TASK
router.post("/", async (req, res) => {
  try {
    const newTask = new Task({ title: req.body.title });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. DELETE ALL
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

module.exports = router;
