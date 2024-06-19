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
    ref: 'Image'  // refer to 'Image' is schema
  },
  color: {
    type: String, // Array of colors
    required: true
  },
  size: {
    type: [String],  // Array of sizes
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' //refer to category schema
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],  // Adjust enum values based on your requirements
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true  // Default availability status
  }
}, {versionKey:false});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
