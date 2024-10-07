const pool = require('../pool'); // Import the PostgreSQL connection pool

// Function to insert a new db post
const insertDbPost = async (imageId, heading, content, ownerId, edited = false) => {
  const query = `
    INSERT INTO db_posts (image_id, heading, content, owner_id, edited)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`;
    
  const values = [imageId, heading, content, ownerId, edited];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the newly inserted db post
  } catch (err) {
    console.error('Error inserting db post:', err);
    throw err;
  }
};

// Function to remove a db post by post_id
const removeDbPost = async (postId) => {
  const query = `
    DELETE FROM db_posts
    WHERE post_id = $1
    RETURNING *;`;

  try {
    const result = await pool.query(query, [postId]);
    return result.rows[0]; // Return the deleted db post (if any)
  } catch (err) {
    console.error('Error removing db post:', err);
    throw err;
  }
};

module.exports = {
  insertDbPost,
  removeDbPost
};
