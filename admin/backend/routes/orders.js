const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming you have an Order model

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}, 'orderId productName productPrice deliveryType status');
    console.log(orders); // Log the orders data to confirm it is fetched correctly
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: err.message });
  }
});

// PATCH to confirm order (Order Confirmed stage)
router.patch('/:orderId/confirm', async (req, res) => {
  const { orderId } = req.params;

  try {
    console.log(`Attempting to confirm order with ID: ${orderId}`);

    const order = await Order.findOne({ orderId });

    if (!order) {
      console.error(`Order not found: ${orderId}`);
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('Found order:', order);

    // Ensure status is an array
    if (!Array.isArray(order.status)) {
      console.error('Invalid order structure:', order);
      return res.status(400).json({ message: 'Invalid order structure' });
    }

    // Update the completed status of the "Order Confirmed" stage
    const updatedStatus = order.status.map(stage => {
      if (stage.stage === 'Order Confirmed') {
        return { ...stage, completed: true }; // Update completed status to true
      }
      return stage;
    });

    // Only save if there's a change
    if (JSON.stringify(order.status) !== JSON.stringify(updatedStatus)) {
      order.status = updatedStatus;
      await order.save();
      console.log('Saved order:', order);
    } else {
      console.log('No updates made to the completed status.');
    }

    res.json({ message: 'Order confirmed', orderId, order });
  } catch (err) {
    console.error('Error in confirming order:', err);
    res.status(500).json({ message: err.message });
  }
});

// PATCH to update the "Shipped" stage
router.patch('/:orderId/ship', async (req, res) => {
  const { orderId } = req.params;

  try {
    console.log(`Attempting to update shipment stage for order with ID: ${orderId}`);

    const order = await Order.findOne({ orderId });

    if (!order) {
      console.error(`Order not found: ${orderId}`);
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('Found order:', order);

    // Ensure status is an array
    if (!Array.isArray(order.status)) {
      console.error('Invalid order structure:', order);
      return res.status(400).json({ message: 'Invalid order structure' });
    }

    // Update the completed status of the "Shipped" stage
    const updatedStatus = order.status.map(stage => {
      if (stage.stage === 'Shipped') {
        return { ...stage, completed: true }; // Update completed status to true
      }
      return stage;
    });

    // Only save if there's a change
    if (JSON.stringify(order.status) !== JSON.stringify(updatedStatus)) {
      order.status = updatedStatus;
      await order.save();
      console.log('Updated shipment status for order:', order);
    } else {
      console.log('No updates made to the shipped status.');
    }

    res.json({ message: 'Order shipped', orderId, order });
  } catch (err) {
    console.error('Error in updating shipment stage:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
