const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // Password compare karne ke liye
const jwt = require("jsonwebtoken"); // Token banane ke liye

// 1. SIGNUP ROUTE (Jo aapke paas pehle se hai)
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exists" });

    user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 2. LOGIN ROUTE (Level 3 ke liye naya addition)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check karein user hai ya nahi
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found!" });

    // Password match karein (Bcrypt use karke)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid Credentials!" });

    // JWT Token generate karein
    // "MY_SECRET_KEY" ki jagah aap apna koi bhi secret word likh sakti hain
    const token = jwt.sign({ id: user._id }, "MY_SECRET_KEY", {
      expiresIn: "1h",
    });

    res.json({
      message: "Login Successful!",
      token: token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
