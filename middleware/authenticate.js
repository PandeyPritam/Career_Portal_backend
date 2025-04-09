const jwt = require("jsonwebtoken");
const User = require("../models/User");
module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received Token:", token);
  
  
 if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const user = await User.findById(decoded.id).select("-password"); 
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    req.user = user; 
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};