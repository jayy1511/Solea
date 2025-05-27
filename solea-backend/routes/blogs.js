const express = require('express');
const router = express.Router();

// Get all blog posts
router.get('/', (req, res) => {
  res.send('Fetch all blog posts (to be implemented)');
});

// Get single blog post by ID
router.get('/:blogId', (req, res) => {
  res.send(`Fetch blog post ${req.params.blogId} (to be implemented)`);
});

module.exports = router;
