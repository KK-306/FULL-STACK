const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const users = require("./users");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

dotenv.config();
const app = express();
app.use(express.json());

// Login Route — issues JWT with role
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token,
    role: user.role
  });
});

// Protected Routes
app.get("/admin", authMiddleware, roleMiddleware(["Admin"]), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.username}!` });
});

app.get("/moderator", authMiddleware, roleMiddleware(["Admin", "Moderator"]), (req, res) => {
  res.json({ message: `Hello Moderator ${req.user.username}!` });
});

app.get("/user", authMiddleware, roleMiddleware(["Admin", "Moderator", "User"]), (req, res) => {
  res.json({ message: `Hi User ${req.user.username}!` });
});

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
