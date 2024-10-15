const pool = require('../pool'); // Import the PostgreSQL pool connection

// Function to insert a new event post
const insertEventPost = async (heading, content, ownerId, imageUrl) => {
  try {
    const result = await pool.query(
      `INSERT INTO eagleeye_schema.event_posts (heading, content, owner_id, image_url) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [heading, content, ownerId, imageUrl]
    );
    return result.rows[0]; // Return the newly inserted event post
  } catch (error) {
    console.error('Error inserting event post:', error);
    throw error;
  }
};

// Function to get recent event posts
const getRecentEventPosts = async (limit) => {
  try {
    const result = await pool.query(
      `SELECT * FROM eagleeye_schema.event_posts ORDER BY post_date DESC LIMIT $1`,
      [limit]
    );
    return result.rows; // Ensure image_url is included
  } catch (error) {
    console.error('Error fetching recent event posts:', error);
    throw error;
  }
};

module.exports = { insertEventPost, getRecentEventPosts };
