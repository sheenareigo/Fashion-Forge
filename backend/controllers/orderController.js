const Order = require('../models/Order');
const User = require('../models/User');
const { clearUserCart } = require('./cartController');

const createOrder = async (req, res) => {
  const { userId, cart, total, couponCode } = req.body;

  if (!userId || !cart || !total) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    // Fetch the user's cart details and populate product information
    const user = await User.findById(userId).populate('cart.products.product_id');

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const products = cart.map(item => {
      const productFromCart = user.cart.products.find(p => p.product_id._id.toString() === item.product_id);

      if (!productFromCart) {
        throw new Error(`Product with id ${item.product_id} not found in user's cart`);
      }

      return {
        product_id: productFromCart.product_id._id,
        product_name: productFromCart.product_id.product_name,      
        quantity: item.quantity,
        //price: productFromCart.product_id.price ,  
        price: (item.quantity && productFromCart.product_id.price) ? item.quantity * productFromCart.product_id.price : 0 ,
        size: item.size,
        image:productFromCart.product_id.image
      };
    });

    // Create a new order with product details
    const newOrder = new Order({
      user_id: userId,
      products,
      total_amount: total,
      coupon: couponCode || null,
      status: 'Preparing'
    });

    // Save the new order to the database
    await newOrder.save();

    // Clear the user's cart after successfully creating the order
    user.cart.products = [];
    await user.save();

    return res.status(200).json({ success: true, order: newOrder });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};




const getOrderHistory = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const orders = await Order.find({ user_id: userId }).sort({ order_date: -1 });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
module.exports = { createOrder,getOrderHistory };
