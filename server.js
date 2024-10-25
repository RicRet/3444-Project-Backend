require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import route files
const userRoutes = require('./routes/users.js');
const imageRoutes = require('./routes/images.js');
const eventPostRoutes = require('./routes/eventPosts.js');
const dbPostRoutes = require('./routes/dbPosts.js');
const salesPostRoutes = require('./routes/salesPosts.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes 
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/events', eventPostRoutes);
app.use('/api/dbposts', dbPostRoutes);
app.use('/api/sales', salesPostRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

