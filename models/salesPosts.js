const pool = require('../pool'); // PostgreSQL connection pool

// Function to insert a new sales post
const insertSalesPost = async (imageId, heading, content, ownerId, edited = false) => {
  const query = `
    INSERT INTO eagleeye_schema.sales_post (image_id, heading, content, owner_id, edited)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`;
    
  const values = [imageId, heading, content, ownerId, edited];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the newly inserted sales post
  } catch (err) {
    console.error('Error inserting sales post:', err);
    throw err;
  }
};

// Function to remove a sales post by post_id
const removeSalesPost = async (postId) => {
  const query = `
    DELETE FROM eagleeye_schema.sales_post
    WHERE post_id = $1
    RETURNING *;`;

  try {
    const result = await pool.query(query, [postId]);
    return result.rows[0]; // Return the deleted sales post (if any)
  } catch (err) {
    console.error('Error removing sales post:', err);
    throw err;
  }
};

module.exports = {
  insertSalesPost,
  removeSalesPost
};
