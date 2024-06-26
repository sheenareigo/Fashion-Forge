const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  products: [{
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
      required: true
    },
    quantity: {
      type: Number,
      default: 1
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
    default: Date.now  
  },
  total_amount: {
    type: Number,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
