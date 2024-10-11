const pool = require('../pool');

// Function to insert an image
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

// Function to remove an image
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

// Function to get image by ID
const getImageById = async (imageId) => {
  try {
    const result = await pool.query(
      `SELECT image_url FROM eagleeye_schema.images WHERE image_id = $1`,
      [imageId]
    );
    if (result.rows.length === 0) {
      throw new Error('Image not found');
    }
    return result.rows[0]; // Return the image URL
  } catch (error) {
    console.error('Error fetching image by ID:', error);
    throw error;
  }
};

module.exports = { insertImage, removeImage, getImageById };
