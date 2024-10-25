const express = require('express');
const bcrypt = require('bcrypt')
const { insertUser, removeUser, authorizeUserLogin } = require('../models/users.js');

const router = express.Router();

// Route to insert a new user
router.post('/', async (req, res) => {

  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    // Hash the password before inserting the user
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("it got to this shi atleast");
    const newUser = await insertUser(username, email, hashedPassword);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during user registration:', error);
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

// Route to authenticate a user (login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authorizeUserLogin(email, password);

    if (result.success) {
      res.status(200).json({ message: result.message, user: result.user });
    } else {
      res.status(401).json({ message: result.message });
    }
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
