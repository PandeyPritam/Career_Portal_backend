const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const isAdmin = role === "admin"; 
    const user = new User({ firstName, lastName, email, password, isAdmin });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate a JWT token with the user's ID and isAdmin flag
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Return the token and isAdmin flag
    res.status(200).json({
      message: "Login successful",
      token,
      isAdmin: user.isAdmin, // Include the isAdmin flag in the response
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "An error occurred during login." });
  }
};