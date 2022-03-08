const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

// Getting all
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getBlog, (req, res) => {
  res.send(res.blog);
});
// Creating one
router.post("/", async (req, res) => {
  const blog = await Blog({
    sub_heading: req.body.sub_heading,
    text: req.body.text,
    img: req.body.img,
    created_by: req.userId,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Updating One
router.patch("/:id",getBlog, async (req, res) => {
  if (req.body.sub_heading != null) {
    res.blog.name = req.body.sub_heading;
  }
  if (req.body.text != null) {
    res.blog.text = req.body.text;
  }
  if (req.body.img != null) {
    res.blog.img = req.body.img;
  }
  try {
    const updatedBlog = await res.blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Deleting One
router.delete("/:id",getBlog, async (req, res) => {
  try {
    await res.blog.remove();
    res.json({ message: "blog removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getBlog(req, res, next) {
  let blogs;
  try {
    blogs = await blogModels.findById(req.params.id);
    if (blogs == null) {
      return res.status(404).json({ message: "cannot find blog" });
    }
  } catch (error) {
    return res.status(500).json({ mssage: error.message });
  }
  res.blogs = blogs;
  next();
}
module.exports = router;
