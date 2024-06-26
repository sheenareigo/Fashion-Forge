const mongoose = require('mongoose');
const Image = require('./Image');
const Category = require('./Category');

const productSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  product_name: {
    type: String,
    required: true
  },
  image_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'  
  },
  color: {
    type: String, 
    required: true
  },
  size: {
    type: [String],  
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],  
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }
}, {versionKey:false});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
