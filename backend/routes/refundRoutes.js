// refundRoutes.js

const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Adjust the path based on your folder structure

// Route to process refund
router.post('/refund/:orderId', async (req, res) => {
  const { orderId } = req.params; // Get the orderId from the URL

  try {
    // Assuming you have a Mongoose model for orders
    const order = await Order.findOne({ orderId }); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the refundProcessed field to true
    order.refundProcessed = true;
    await order.save(); // Save the updated order to the database

    // Return a success response
    res.status(200).json({ message: 'Refund processed successfully', order });
  } catch (error) {
    // Handle any errors that occur
    console.error('Error processing refund:', error);
    res.status(500).json({ message: 'Error processing refund', error });
  }
});

module.exports = router;
