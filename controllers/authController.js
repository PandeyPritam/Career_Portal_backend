const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ error: "Invalid role selected." });
    }

    const isAdmin = role === "admin"; 

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ firstName, lastName, email, password: hashedPassword, role, isAdmin });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log("Login Request Data:", { email, password, role }); // Debugging log

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch); // Debugging log
    if (!isMatch) {
      console.error("Invalid credentials");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if the role matches
    if ((role === "admin" && !user.isAdmin) || (role === "user" && user.isAdmin)) {
      console.error("Access denied. Incorrect role selected.");
      return res.status(403).json({ error: "Access denied. Incorrect role selected." });
    }

    // Generate a JWT token with the user's ID and isAdmin flag
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log("Login Successful:", { token, isAdmin: user.isAdmin }); // Debugging log

    // Return the token and isAdmin flag
    res.status(200).json({
      message: "Login successful",
      token,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "An error occurred during login." });
  }
};