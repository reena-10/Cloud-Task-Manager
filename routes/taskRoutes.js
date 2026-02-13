const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// 1. GET ALL TASKS
router.get("/", async (req, res) => {
  try {
    // Sabhi tasks ko find karein bina kisi filter ke
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 2. POST A NEW TASK (Add Button Fix)
router.post("/", async (req, res) => {
  try {
    // Sirf title save karein, user ki zaroorat nahi hai
    const newTask = new Task({
      title: req.body.title,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. DELETE ALL TASKS
router.delete("/", async (req, res) => {
  try {
    await Task.deleteMany({});
    res.status(200).json({ message: "All tasks cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. DELETE ONE TASK
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. PATCH (Toggle Complete)
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
