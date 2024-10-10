const bcrypt = require('bcrypt');
const pool = require('../pool.js');  // Shared database connection

// Function to insert a new user into the database
const insertUser = async (username, email, hashedPassword) => {
  try {
    // Ensure the schema and table name are correct
    const result = await pool.query(
      `INSERT INTO eagleeye_schema.users (username, email, hashed_password) 
       VALUES ($1, $2, $3) RETURNING *`,
      [username, email, hashedPassword] // Pass the values here
    );

    // Return the inserted user data
    return result.rows[0];
  } catch (error) {
    // Improved error logging for debugging
    console.error('Error inserting user:', error.message); // Log only the error message
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};




// Function to remove a user from the database by user ID
const removeUser = async (userId) => {
  try {
    const result = await pool.query(
      `DELETE FROM users WHERE user_id = $1 RETURNING *`,
      [userId]
    );
    return result.rows[0]; // Returns the deleted user's data, or null if no user was found
  } catch (error) {
    console.error('Error removing user:', error);
    throw error;
  }
};

// Function to authorize user login based on email and password
const authorizeUserLogin = async (email, password) => {
  try {
    // Query the user by email
    const result = await pool.query('SELECT * FROM eagleeye_schema.users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return { success: false, message: 'Email not found' };
    }

    const user = result.rows[0];

    // Compare provided password with hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.hashed_password);

    if (!passwordMatch) {
      return { success: false, message: 'Invalid password' };
    }

    // If email and password are valid
    return { success: true, message: 'Login successful', user };

  } catch (error) {
    console.error('Error during login authorization:', error);
    return { success: false, message: 'Server error' };
  }
};

module.exports = { insertUser, removeUser, authorizeUserLogin };
