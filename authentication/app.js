const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("./db/connect");
const dotenv = require("dotenv");
const User = require("./models/user");

dotenv.config();

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;

app.get("/auth", (req, res) => {
  console.log("hello auth");
  res.send("Hello from auth side");
});

app.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {expiresIn: "24h"});
      res.json({ msg: "logged in successfully", token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The authentication is running at ${PORT}`);
});
