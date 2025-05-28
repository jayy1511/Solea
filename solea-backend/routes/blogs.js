const express = require('express');
const router = express.Router();
const { getAllBlogs, getBlogById } = require('../controllers/blogController');

// @route   GET /api/blogs
router.get('/', getAllBlogs);

// @route   GET /api/blogs/:blogId
router.get('/:blogId', getBlogById);

module.exports = router;
