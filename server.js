const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();
const app = express();

app.use(express.json());

// Dummy user (for demo purpose)
const user = {
  id: 1,
  username: "admin",
  password: "password123",
};

// Login route to generate JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Protected route
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, this is a protected route!` });
});

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
