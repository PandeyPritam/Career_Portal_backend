const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const Blog = require("../models/Blog");

const router = express.Router();

// Add a new blog
router.post("/", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const blog = new Blog({ title, content });
    await blog.save();
    res.status(201).json({ message: "Blog added successfully", blog });
  } catch (error) {
    res.status(500).json({ error: "Failed to add blog" });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

module.exports = router;