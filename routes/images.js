const express = require('express');
const { insertImage, removeImage, getImageById } = require('../models/images.js');

const router = express.Router();

// Route to insert an image
router.post('/images', async (req, res) => {
  const { imageUrl } = req.body; // Changed to imageUrl
  try {
    const newImage = await insertImage(imageUrl); // Pass the image URL to insertImage
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: 'Error inserting image' });
  }
});

// Route to remove an image by imageId
router.delete('/images/:imageId', async (req, res) => {
  const { imageId } = req.params;
  try {
    const deletedImage = await removeImage(imageId);
    if (deletedImage) {
      res.status(200).json({ message: 'Image deleted', image: deletedImage });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing image' });
  }
});

// Route to fetch an image URL by imageId
router.get('/images/:imageId', async (req, res) => {
  console.log("Got to the route section"); // This should trigger if the route is hit
  const { imageId } = req.params;
  try {
    const imageData = await getImageById(imageId);
    if (!imageData) {
      console.log(`Image not found for ID: ${imageId}`);
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json(imageData); // Return the image URL
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
