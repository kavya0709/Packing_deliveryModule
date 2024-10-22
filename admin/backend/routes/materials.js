// backend/routes/materials.js
const express = require('express');
const router = express.Router();
const Material = require('../models/Material'); // Assuming you have a Material model

// GET all materials
router.get('/api/materials', async (req, res) => {
  try {
    const materials = await Material.find(); // Fetch all materials
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
