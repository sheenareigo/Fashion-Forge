// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const {
    addToCart,
    removeFromCart,
    updateCartItem,
    getCart,
    incrementCartItem
        
      
} = require('../controllers/cartController'); 

// Define routes for cart operations
router.post('/add', addToCart); 
router.delete('/remove', removeFromCart); 
router.put('/update', updateCartItem); 
router.get('/:userId', getCart); 
//router.post('/:userId/increment', incrementCartItem);
//router.put('/increase/:userId', incrementCartItem);
router.post('/:userId/increment', incrementCartItem); 
//router.get('/:userId', cartController.getCartByUserId);

module.exports = router;