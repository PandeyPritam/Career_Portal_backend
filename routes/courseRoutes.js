const express = require("express");
const Course = require("../models/Course");
const router = express.Router();
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query; 
    const courses = await Course.find({
      title: { $regex: query, $options: "i" }, 
    });
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

module.exports = router;