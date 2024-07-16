const express = require('express');
const router = express.Router();
const { createOrder, getOrderHistory } = require('../controllers/orderController');

// Checkout route
router.post('/checkout', createOrder);

// Order history route
router.get('/order-history/:userId', getOrderHistory);

module.exports = router;