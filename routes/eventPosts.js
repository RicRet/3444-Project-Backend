const express = require('express');
const { insertEventPost, removeEventPost } = require('../models/eventPosts.js'); // Importing the functions from the model

const router = express.Router();

// Route to insert a new event post
router.post('/', async (req, res) => {
  const { imageId, heading, content, ownerId, edited } = req.body;
  
  try {
    const newEventPost = await insertEventPost(imageId, heading, content, ownerId, edited);
    res.status(201).json(newEventPost);
  } catch (error) {
    console.error('Error inserting event post:', error);
    res.status(500).json({ message: 'Error inserting event post' });
  }
});

// Route to remove an event post by postId
router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedEventPost = await removeEventPost(postId);
    if (deletedEventPost) {
      res.status(200).json({ message: 'Event post deleted', eventPost: deletedEventPost });
    } else {
      res.status(404).json({ message: 'Event post not found' });
    }
  } catch (error) {
    console.error('Error removing event post:', error);
    res.status(500).json({ message: 'Error removing event post' });
  }
});

module.exports = router;
