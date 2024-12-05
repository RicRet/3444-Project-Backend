const pool = require('../pool'); // PostgreSQL connection pool

// Function to insert a new sales post
const insertSalesPost = async (heading, content, ownerId, imageUrl, edited = false) => {
  const query = `
    INSERT INTO eagleeye_schema.sales_posts (heading, content, owner_id, image_url, edited)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [heading, content, ownerId, imageUrl, edited];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the newly inserted sales post
  } catch (err) {
    console.error('Error inserting sales post:', err);
    throw err;
  }
};

// Function to get recent sales posts
const getRecentSalesPosts = async (limit = 10) => {
  const query = `
    SELECT * FROM eagleeye_schema.sales_posts
    ORDER BY post_date DESC
    LIMIT $1;
  `;
  try {
    const result = await pool.query(query, [limit]);
    return result.rows;
  } catch (err) {
    console.error('Error fetching recent sales posts:', err);
    throw err;
  }
};

module.exports = {
  insertSalesPost,
  getRecentSalesPosts,
};
