const express = require("express");
const { register, login } = require("../controllers/authController");
const validateInput = require("../middleware/validateInput");
const authenticate = require("../middleware/authenticate"); 
const router = express.Router();

router.post("/register", validateInput, register); 
router.post("/login", login); 
router.get("/dashboard", authenticate, async (req, res) => {
  try {
    const user = req.user; 
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

module.exports = router;