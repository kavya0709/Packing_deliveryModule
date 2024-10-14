// statusRoutes.js

const express = require('express');
const router = express.Router();
const OrderStatus = require('../models/Status.js');

// Update order status by orderId and stage
// Fetch order status by orderId
router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await OrderStatus.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
