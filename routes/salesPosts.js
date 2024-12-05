const express = require('express');
const { insertSalesPost, getRecentSalesPosts } = require('../models/salesPosts.js'); // Importing functions from the model

const router = express.Router();

// Route to insert a new sales post
router.post('/', async (req, res) => {
  const { heading, content, ownerId, imageUrl } = req.body;
  try {
    const newSalesPost = await insertSalesPost(heading, content, ownerId, imageUrl);
    res.status(201).json(newSalesPost);
  } catch (error) {
    console.error('Error inserting sales post:', error);
    res.status(500).json({ message: 'Error inserting sales post' });
  }
});

// Route to get recent sales posts
router.get('/recent', async (req, res) => {
  const { limit } = req.query;
  try {
    const posts = await getRecentSalesPosts(limit);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching recent sales posts:', error);
    res.status(500).json({ message: 'Error fetching recent sales posts' });
  }
});

module.exports = router;
