const express = require('express');
const { insertUser, removeUser } = require('../models/users.js');

const router = express.Router();

// Route to insert a new user
router.post('/', async (req, res) => { // No '/users' here
  const { username, email, password, profilePictureId } = req.body;
  try {
    const newUser = await insertUser(username, email, password, profilePictureId);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error inserting user' });
  }
});

// Route to remove a user by userId
router.delete('/:userId', async (req, res) => { // No '/users' here
  const { userId } = req.params;
  try {
    const deletedUser = await removeUser(userId);
    if (deletedUser) {
      res.status(200).json({ message: 'User deleted', user: deletedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing user' });
  }
});

module.exports = router;
