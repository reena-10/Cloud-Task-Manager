const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// PASSWORD HASHING (बिना 'next' के - Modern Style)
userSchema.pre("save", async function () {
  // Agar password change nahi hua toh kuch mat karo
  if (!this.isModified("password")) return;

  try {
    // Salt aur Hash generate karein
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // Yahan humne next() nahi likha hai kyunki async function
    // khud hi aage badh jata hai return hone par
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = mongoose.model("User", userSchema);
