module.exports = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !/^[A-Za-z]+$/.test(firstName)) {
    return res.status(400).json({ error: "First name must contain only alphabets" });
  }

  if (!lastName || !/^[A-Za-z]+$/.test(lastName)) {
    return res.status(400).json({ error: "Last name must contain only alphabets" });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!password || !/^(?=.*[!@#$%^&*])/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one special character" });
  }

  next();
};