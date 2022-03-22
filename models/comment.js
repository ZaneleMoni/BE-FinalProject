const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  created_for: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
module.exports = mongoose.model("Comment", commentSchema);
