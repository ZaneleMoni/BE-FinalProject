const Blog = require("../models/blog");

getBlog = async (req, res, next) => {
  let blog;
  try {
    blog = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "cannot find blog" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.blog = blog;
  next();
};

module.exports = getBlog;
