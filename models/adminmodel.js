const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      match: /^[A-Za-z]+$/,
    },
    lastName: {
      type: String,
      required: true,
      match: /^[A-Za-z]+$/, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      match: /^(?=.*[!@#$%^&*])/, 
    },
  });
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Admin", adminSchema);