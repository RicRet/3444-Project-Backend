const express = require('express');
const { insertDbPost, removeDbPost } = require('../models/dbPosts.js'); // Import functions from the model

const router = express.Router();

// Route to insert a new db post
router.post('/', async (req, res) => {
  const { imageId, heading, content, ownerId, edited } = req.body;

  try {
    const newDbPost = await insertDbPost(imageId, heading, content, ownerId, edited);
    res.status(201).json(newDbPost);
  } catch (error) {
    console.error('Error inserting db post:', error);
    res.status(500).json({ message: 'Error inserting db post' });
  }
});

// Route to remove a db post by postId
router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedDbPost = await removeDbPost(postId);
    if (deletedDbPost) {
      res.status(200).json({ message: 'Db post deleted', dbPost: deletedDbPost });
    } else {
      res.status(404).json({ message: 'Db post not found' });
    }
  } catch (error) {
    console.error('Error removing db post:', error);
    res.status(500).json({ message: 'Error removing db post' });
  }
});

router.get('/recent', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default to 10 posts

  try {
    const recentPosts = await getRecentDbPosts(limit);
    res.status(200).json(recentPosts);
  } catch (error) {
    console.error('Error fetching recent db posts:', error);
    res.status(500).json({ message: 'Error fetching recent db posts' });
  }
});

module.exports = router;
