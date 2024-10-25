const express = require('express');
const { insertSalesPost, removeSalesPost } = require('../models/salesPosts.js'); // Import the functions from the model

const router = express.Router();

// Route to insert a new sales post
router.post('/', async (req, res) => {
  const { imageId, heading, content, ownerId, edited } = req.body;

  try {
    const newSalesPost = await insertSalesPost(imageId, heading, content, ownerId, edited);
    res.status(201).json(newSalesPost);
  } catch (error) {
    console.error('Error inserting sales post:', error);
    res.status(500).json({ message: 'Error inserting sales post' });
  }
});

// Route to remove a sales post by postId
router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedSalesPost = await removeSalesPost(postId);
    if (deletedSalesPost) {
      res.status(200).json({ message: 'Sales post deleted', salesPost: deletedSalesPost });
    } else {
      res.status(404).json({ message: 'Sales post not found' });
    }
  } catch (error) {
    console.error('Error removing sales post:', error);
    res.status(500).json({ message: 'Error removing sales post' });
  }
});

module.exports = router;
