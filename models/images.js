const pool = require('../pool');

const insertImage = async (imageUrl) => {
  try {
    const result = await pool.query(
      `INSERT INTO eagleeye_schema.images (image_url) 
       VALUES ($1) RETURNING *`,
      [imageUrl]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting image:', error);
    throw error;
  }
};

const removeImage = async (imageId) => {
  try {
    const result = await pool.query(
      `DELETE FROM eagleeye_schema.images WHERE image_id = $1 RETURNING *`,
      [imageId]
    );
    return result.rows[0]; // Returns the deleted image data, or null if no image was found
  } catch (error) {
    console.error('Error removing image:', error);
    throw error;
  }
};

module.exports = { insertImage, removeImage };
