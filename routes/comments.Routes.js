const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single Blog
router.get("/:id", Comment, (req, res) => {
  res.send(req.comments);
});

// Create Blog
router.post("/", async (req, res) => {
  const comments = new Comment({
    title: req.body.title,
  });
  try {
    const Comment = await comments.save();
    res.status(201).json(Comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update blog
router.patch("/:id", Comment, async (req, res) => {
  if (req.body.title != null) {
    res.comments.title = req.body.title;
  }
  try {
    const updatedComment = await res.comments.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Blog
router.delete("/:id", Comment, async (req, res) => {
  try {
    await res.comments.remove();
    res.json({ message: "Comment Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getComments(req, res, next) {
  let blogs;
  try {
    comments = await Comment.findById(req.params.id);
    if (comments == null) {
      return res.status(404).json({ message: "Cannot find blog" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.comments = comments;
  next();
}
module.exports = router;
