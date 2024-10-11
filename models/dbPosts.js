const pool = require('../pool');

// Function to insert a new db post
const insertDbPost = async (heading, content, ownerId, imageUrl) => {
  try {
    const result = await pool.query(
      `INSERT INTO eagleeye_schema.db_posts (heading, content, owner_id, image_url) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [heading, content, ownerId, imageUrl]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting db post:', error);
    throw error;
  }
};

// Function to get recent db posts
const getRecentDbPosts = async (limit) => {
  try {
    const result = await pool.query(
      `SELECT * FROM eagleeye_schema.db_posts ORDER BY post_date DESC LIMIT $1`,
      [limit]
    );
    return result.rows; // Ensure image_url is included
  } catch (error) {
    console.error('Error fetching recent db posts:', error);
    throw error;
  }
};

module.exports = { insertDbPost, getRecentDbPosts };
