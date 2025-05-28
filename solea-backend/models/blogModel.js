const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: 'Admin'
    },
    content: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    tags: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
