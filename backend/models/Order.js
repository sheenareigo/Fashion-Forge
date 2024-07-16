const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
    product_name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    size: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
   image: {
      type: String,
      //required: true
    }
  }],
  coupon: {
    type: String,
    default: null
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


