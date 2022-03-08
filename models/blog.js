const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
  
  sub_heading: {
    type: String,
    required: [true, "Please include the product name"],
  },
  text: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required:true
  },
  createDate:{
    type: Date,
    required: true,
    default: Date.now
  }
});
module.exports = mongoose.model("Blog", blogSchema);