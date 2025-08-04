const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Models
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

const { HoldingsModel } = require("./model/HoldingModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

// ✅ Middleware
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"," https://zerodha-frontends.onrender.com","https://zerodha-dashboard-lnu0.onrender.com"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Passport config
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "Incorrect username." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Incorrect password." });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// ✅ Signup with auto-login
app.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = new User({ username, password: hashed });
  await user.save();

  req.login(user, (err) => {
    if (err) return next(err);
    res.json({ message: "Signup successful", user: { username: user.username } });
  });
});

// ✅ Login route
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful", user: { username: req.user.username } });
});

// ✅ Check auth for dashboard
app.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: { username: req.user.username } });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// ✅ Logout
app.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

// ✅ Your existing routes (example holdings, positions, orders)
app.get("/allHoldings", async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  const newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  await newOrder.save();
  res.send("Order saved!");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log ( `http://localhost:${PORT}`); 
});

