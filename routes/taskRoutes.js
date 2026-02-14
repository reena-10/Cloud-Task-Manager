const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// 1. GET ALL TASKS (Filtered by Secret Key)
router.get("/", async (req, res) => {
  try {
    const { secret } = req.query;
    const tasks = await Task.find({ secretKey: secret });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 2. POST A NEW TASK (With Secret Key)
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

// 3. DELETE ALL (Only for this specific user)
router.delete("/", async (req, res) => {
  try {
    const { secret } = req.query;
    await Task.deleteMany({ secretKey: secret });
    res.json({ message: "Your tasks cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. DELETE ONE & PATCH (Baki same rahega)
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
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
