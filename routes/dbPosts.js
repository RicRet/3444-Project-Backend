const express = require('express');
const { insertDbPost, getRecentDbPosts } = require('../models/dbPosts.js');

const router = express.Router();

// Route to insert a new db post
router.post('/', async (req, res) => {
  const { heading, content, ownerId, imageUrl } = req.body; // Include imageUrl
  try {
    const newPost = await insertDbPost(heading, content, ownerId, imageUrl);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error inserting post' });
  }
});

// Route to get recent db posts
router.get('/recent', async (req, res) => {
  const { limit } = req.query;
  try {
    const posts = await getRecentDbPosts(limit);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent posts' });
  }
});

module.exports = router;
