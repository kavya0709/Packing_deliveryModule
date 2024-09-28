require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const statusRoutes = require('./routes/statusRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/status', statusRoutes);

// Debugging: Check if MONGO_URI is loaded
console.log('MONGO_URI:', process.env.MONGO_URI);

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://PackerKS2445:1232445SkPk@cluster0.sadmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
