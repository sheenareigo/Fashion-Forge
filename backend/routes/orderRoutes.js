const express = require('express');
const router = express.Router();
const { createOrder, getOrderHistory, cancelOrder,cancellationEmail } = require('../controllers/orderController');
const { successEmail } = require('../controllers/orderController');


// Checkout route
router.post('/checkout', createOrder);

// Order history route
router.get('/order-history/:userId', getOrderHistory);

// Cancel order route
router.patch('/cancel/:orderId', cancelOrder);

router.post('/success-email', successEmail);

router.post('/cancelemail', cancellationEmail);

module.exports = router;
