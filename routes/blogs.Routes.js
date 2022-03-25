const express = require("express");
const router = express.Router();
const auth = require("../middleware/authJwt");
const blogModels = require("../models/blog");
const Comment = require("../models/comment")
// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogs = await blogModels.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single Blog
router.get("/:id", getBlogs, (req, res) => {
  res.send(res.blogs);
});

// Create Blog
router.post("/", async (req, res) => {
  const blogs = new blogModels({
    title: req.body.title,
    content: req.body.content,
    img: req.body.img,
  });
  try {
    const newBlog = await blogs.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update blog
router.patch("/:id", getBlogs, async (req, res) => {
  if (req.body.title != null) {
    res.blogs.title = req.body.title;
  }
  if (req.body.content != null) {
    res.blogs.content = req.body.content;
  }
  if (req.body.img != null) {
    res.blogs.img = req.body.img;
  }
  try {
    const updatedBlog = await res.blogs.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Blog
router.delete("/:id", getBlogs, async (req, res) => {
  try {
    await res.blogs.remove();
    res.json({ message: "Blog Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
async function getBlogs(req, res, next) {
  let blogs;
  try {
    blogs = await blogModels.findById(req.params.id);
    if (blogs == null) {
      return res.status(404).json({ message: "Cannot find blog" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.blogs = blogs;
  next();
}

//Get one comment
router.get("blogs/comments/:id", getComments, (req, res) => {
  res.send(res.comments);
});
// Get all comments
router.get("blogs/:comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a blog comment
router.post("blogs/:id/comments", auth, async (req, res, next) => {
  const { title, body } = req.body;
  try {
    const created_by = req.user_id.toString().replace(/['"]+/g, "");

    const comment = new Comment({
      title,
      body,
      created_by,
      created_for: req.params.id,
    
    });
    
      const newComment = await comment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  
});
  
// Delete comment
router.delete("/:id/comments", async (req, res) => {
  try {
    // await res.comments.remove();
    res.json({ message: "Comment Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update comment
router.patch("/:id/comments", async (req, res) => {
  if (req.body.title != null) {
    res.comments.title = req.body.title;
  }
  try {
    const updatedComment = await res.comments.save();
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
async function getComments(req, res, next) {
  let comments;
  try {
    comments = await Comment.findById(req.params.id);
    if (blogs == null) {
      return res.status(404).json({ message: "Cannot find comment" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.comments = comments;
  next();
}

module.exports = router;
