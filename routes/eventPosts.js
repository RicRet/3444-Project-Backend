const express = require('express');
const { insertEventPost, getRecentEventPosts } = require('../models/eventPosts.js'); // Importing the functions from the model

const router = express.Router();

// Route to insert a new event post
router.post('/', async (req, res) => {
  const { heading, content, ownerId, imageUrl } = req.body; // Include imageUrl
  try {
    const newEventPost = await insertEventPost(heading, content, ownerId, imageUrl);
    res.status(201).json(newEventPost);
  } catch (error) {
    console.error('Error inserting event post:', error);
    res.status(500).json({ message: 'Error inserting event post' });
  }
});

// Route to get recent event posts
router.get('/recent', async (req, res) => {
  const { limit } = req.query;
  try {
    const posts = await getRecentEventPosts(limit);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching recent event posts:', error);
    res.status(500).json({ message: 'Error fetching recent event posts' });
  }
});

module.exports = router;
