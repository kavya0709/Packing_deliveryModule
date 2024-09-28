const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
    stage: String,
    timestamp: { type: Date, default: null }, 
    description: String,
    completed: { type: Boolean, default: false } // Changed from status to completed
});

const orderStatusSchema = new mongoose.Schema({
    orderId: String,
    status: [stageSchema], // Changed to stages
    refundProcessed: Boolean,
    productType: String,
});

const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema, 'orderStatuses');

module.exports = OrderStatus;
