const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ User schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// ✅ Models
const { HoldingsModel } = require("./model/HoldingModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

// ✅ Middleware
app.use(express.json());

// 🔥 CORS FIX for both apps
app.use(
  cors({
    origin: [
      "https://zerodha-frontend-vdk7.onrender.com",
      "https://zerodha-dashboard-lnu0.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// ✅ Auth Middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

// ✅ Signup Route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: "Username already exists" });

  const hashed = await bcrypt.hash(password, 12);
  const user = new User({ username, password: hashed });
  await user.save();

  const token = generateToken(user);
  res.json({ message: "Signup successful", token });
});

// ✅ Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid username or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

  const token = generateToken(user);
  res.json({ message: "Login successful", token });
});

// ✅ Check Auth Route (protected)
app.get("/checkAuth", authenticateJWT, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

// ✅ Logout Route (client just removes token)
app.post("/logout", (req, res) => {
  res.json({ message: "Logged out (remove token from client)" });
});

// ✅ Holdings, Positions, Orders
app.get("/allHoldings", authenticateJWT, async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", authenticateJWT, async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", authenticateJWT, async (req, res) => {
  const newOrder = new OrdersModel(req.body);
  await newOrder.save();
  res.send("Order saved!");
});

// ✅ Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port: ${PORT}`);
});
