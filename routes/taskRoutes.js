const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// 1. GET all tasks
router.get("/", async (req, res) => {
  try {
    // Ab hum saare tasks dikhayenge bina kisi user filter ke
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// 2. POST a new task - (Add button fix)
router.post("/", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      completed: false, // Default false
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// 5. PATCH (Toggle)
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
