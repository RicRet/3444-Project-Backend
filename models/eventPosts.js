const pool = require('../pool'); // Import the PostgreSQL pool connection

// Function to insert a new event post
const insertEventPost = async (imageId, heading, content, ownerId, edited = false) => {
  const query = `
    INSERT INTO eagleeye_schema.event_posts (image_id, heading, content, owner_id, edited)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`;
    
  const values = [imageId, heading, content, ownerId, edited];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the newly inserted event post
  } catch (err) {
    console.error('Error inserting event post:', err);
    throw err;
  }
};

// Function to remove an event post by post_id
const removeEventPost = async (postId) => {
  const query = `
    DELETE FROM eagleeye_schema.event_posts
    WHERE post_id = $1
    RETURNING *;`;

  try {
    const result = await pool.query(query, [postId]);
    return result.rows[0]; // Return the deleted event post (if any)
  } catch (err) {
    console.error('Error removing event post:', err);
    throw err;
  }
};

module.exports = {
  insertEventPost,
  removeEventPost
};
