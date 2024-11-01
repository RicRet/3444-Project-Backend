const express = require('express');
const {insertReply, getReplies} = require('../models/dbReplies.js');

const router = express.Router();

router.post('/', async (req, res) => {
    const { heading, content, ownerId, imageUrl } = req.body; // Include imageUrl
    try {
      const newEventPost = await insertReply(parentID, content, ownerID);
      res.status(201).json(newEventPost);
    } catch (error) {
      console.error('Error inserting db replies:', error);
      res.status(500).json({ message: 'Error inserting db replies' });
    }
  });

  router.get('/recent', async (req, res) => {
    const { limit } = req.query;
    try {
      const posts = await getReplies(limit);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recent posts' });
    }
  });

  

  