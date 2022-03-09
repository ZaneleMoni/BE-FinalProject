const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required:true,
  },
  createDate:{
    type: Date,
    required: true,
    default: Date.now
  }
});
module.exports = mongoose.model("Blog", blogSchema);