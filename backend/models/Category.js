const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Kids'],
    unique: true
  },
  status: {
    type: Boolean,
    default: true
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
