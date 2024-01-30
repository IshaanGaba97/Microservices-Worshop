const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("./db/connect");
const Profile = require("./models/profile");
const authenticateUser = require("./middlewares/authenticate");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(express.json());

app.get("/profile", (req, res) => {
  res.send("Hello from profile side");
});

const SECRET_KEY = process.env.SECRET_KEY;

app.post("/profile/create", authenticateUser, async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    const newProfile = new Profile({
      userId: req.userId,
      firstName,
      lastName,
      email,
    });
    await newProfile.save();
    res.send("Profile created successfully");
  } catch (error) {
    res.status(500).send("Error creating profile");
  }
});

app.put("/profile/edit/:userId", authenticateUser, async (req, res) => {
  const userId = req.params.userId;
  const { firstName, lastName, email } = req.body;
  try {
    await Profile.updateOne({ userId }, { firstName, lastName, email });
    res.send(`Profile for user edited successfully`);
  } catch (error) {
    res.status(500).send(`Error editing profile for user`);
  }
});

app.delete("/profile/delete/:userId", authenticateUser, async (req, res) => {
  const userId = req.params.userId;
  try {
    await Profile.deleteOne({ userId });
    res.send(`Profile for user deleted successfully`);
  } catch (error) {
    res.status(500).send(`Error deleting profile for user`);
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`The profile is running at ${PORT}`);
});
