// statusRoutes.js

const express = require('express');
const router = express.Router();
const OrderStatus = require('../models/Status.js');

// Update order status by orderId and stage
router.put('/:orderId/stage/:stageIndex', async (req, res) => {
    const { orderId, stageIndex } = req.params;

    try {
        const order = await OrderStatus.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const stage = order.status[stageIndex];

        if (stage) {
            if (req.body.completed === true && stage.completed === false) {
                // Set the current timestamp when completed becomes true
                stage.timestamp = new Date(); 
            }

            // Update the completed status
            stage.completed = req.body.completed;

            // Save the updated order status
            await order.save();

            res.json(order);
        } else {
            res.status(404).json({ message: 'Stage not found' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
