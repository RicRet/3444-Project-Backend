const express = require('express');
const {insertReply, getReplies} = require('../models/dbReplies.js');

const router = express.Router();

// Post a reply to a specific sales post
router.post('/', async (req, res) => {
  const { parentID, content, ownerId } = req.body;
  try {
      const newReply = await insertSalesReply(parentID, content, ownerId);
      res.status(201).json(newReply);
  } catch (error) {
      console.error('Error inserting message boeard reply:', error);
      res.status(500).json({ message: 'Error inserting message board reply' });
  }
});

// Get all replies for a specific sales post (parent_sales_id)
router.get('/:parentSalesId/replies', async (req, res) => {
  const { parentSalesId } = req.params; // Get the parent_sales_id from the route parameters
  const { limit } = req.query; // Optionally get a limit from the query parameters
  try {
      const replies = await getReplies(parentSalesId, limit);
      res.status(200).json(replies);
  } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ message: 'Error fetching replies' });
  }
});

module.exports = router;

  