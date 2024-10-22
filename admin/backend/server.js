// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ordersRoute = require('./routes/orders');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://PackerKS2445:1232445SkPk@cluster0.sadmk.mongodb.net/PACKAGEnDELEVERY?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/orders', ordersRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
