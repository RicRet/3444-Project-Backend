const pool = require('../pool'); // Import the PostgreSQL connection pool

// Function to insert a new db post
const insertDbPost = async (imageId, heading, content, ownerId, edited = false) => {
  const query = `
    INSERT INTO eagleeye_schema.db_posts (image_id, heading, content, owner_id, edited)
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
    DELETE FROM eagleeye_schema.db_posts
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

// Function to get the most recent posts
async function getRecentDbPosts(limit = 10) {
  const query = `
    SELECT *
    FROM eagleeye_schema.db_posts
    ORDER BY post_date DESC
    LIMIT $1;
  `;
  const values = [limit];

  try {
    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error fetching recent db posts:', error);
    throw error;
  }
}

module.exports = {
  insertDbPost,
  removeDbPost,
  getRecentDbPosts
};
