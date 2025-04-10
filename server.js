const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("Missing required environment variables. Check your .env file.");
  process.exit(1);
}
connectDB();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes")); 
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/blogs", require("./routes/blogRoute"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));