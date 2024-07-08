// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const {
    addToCart,
    removeFromCart,
    updateCartItem,
    getCart,
    
    incrementProductQuantity,
    decrementProductQuantity
        
      
} = require('../controllers/cartController'); 

// Define routes for cart operations
router.post('/add', addToCart); 
router.delete('/remove', removeFromCart); 
router.put('/update', updateCartItem); 
router.get('/:userId', getCart); 

router.put('/increment', incrementProductQuantity);
router.put('/decrement', decrementProductQuantity);

module.exports = router;