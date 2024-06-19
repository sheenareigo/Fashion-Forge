const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming 'User' is another schema/model for users
    required: true
  },
  products: [{
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',  // Reference to the Product schema/model
      required: true
    },
    quantity: {
      type: Number,
      default: 1  // Default quantity, adjust as per your requirement
    }
  }],
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Delivered', 'Cancelled', 'Shipped', 'Preparing'],
    default: 'Preparing'
  },
  order_date: {
    type: Date,
    default: Date.now  // Default to current date/time when order is created
  },
  total_amount: {
    type: Number,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
