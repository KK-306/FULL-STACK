const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("✅ Backend running successfully on AWS EC2!");
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Node.js Backend through Load Balancer!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
