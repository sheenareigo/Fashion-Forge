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
        image:productFromCart.image
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
    if(user.new_user_discount && user.cart.coupon=="FF20")
        {
            console.log("new user discount made false");
            user.new_user_discount=false;
        }
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

  const cancelOrder = async (req, res) => {
    try {
        console.log("cancel order controller");
        const {orderId} = req.params;
        console.log(orderId);
        const order = await Order.findById(orderId);
        console.log(order);
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }

        const userId = order.user_id;
        console.log(userId);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check and reverse coupon if applicable
        if (order.coupon === "FF20" && user.cart.coupon === "FF20" && !user.new_user_discount) {
            console.log("reverse coupon loop");
            const currentDate = new Date();
            const registrationDate = new Date(user.register_data_time);

            const differenceInDays = Math.floor((currentDate - registrationDate) / (1000 * 60 * 60 * 24));

            if (differenceInDays <= 7) {
                console.log(differenceInDays);
                user.new_user_discount = true;
                user.cart.coupon = null;
                await user.save();
            }
        }

        if (order.status === 'Preparing' || order.status === 'Shipped') {
            order.status = 'Cancelled';
            await order.save();
            console.log("cancallation success");
            return res.status(200).send({ message: 'Order cancelled successfully', order });
        } 
        else {
            console.log("cancallation unsuccessful");
            return res.status(400).send({ message: 'Order cannot be cancelled' });
        }

    } catch (error) {
        console.log("cancallation error");
        return res.status(500).send({ message: 'Server error', error });
    }
};

  
module.exports = { createOrder,getOrderHistory,cancelOrder };
