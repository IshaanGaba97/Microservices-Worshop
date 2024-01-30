const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("./db/connect");
const Post = require("./models/post");
const authenticateUser = require("./middlewares/authenticate");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.get("/post", (req, res) => {
  res.send("Hello from post side");
});

const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());

app.post("/post/create", authenticateUser, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({ userId: req.userId, title, content });
    await newPost.save();
    res.send("Post created successfully");
  } catch (error) {
    res.status(500).send("Error creating post");
  }
});

app.put("/post/edit/:postId", authenticateUser, async (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;
  try {
    await Post.updateOne({ _id: postId }, { title, content });
    res.send(`Post edited successfully`);
  } catch (error) {
    res.status(500).send(`Error editing post`);
  }
});

app.delete("/post/delete/:postId", authenticateUser, async (req, res) => {
  const postId = req.params.postId;
  try {
    await Post.deleteOne({ _id: postId });
    res.send(`Post deleted successfully`);
  } catch (error) {
    res.status(500).send(`Error deleting post`);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The post is running at ${PORT}`);
});
