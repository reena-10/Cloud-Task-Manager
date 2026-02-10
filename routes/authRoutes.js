const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Double check the path (../)

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for existing user
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exists" });

    user = new User({ email, password });
    await user.save(); // Yeh line middleware trigger karegi

    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
