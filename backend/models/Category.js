const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
    unique: true
  },
  genre_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'  // Reference to the Genre schema/model
  },
  status: {
    type: Boolean,
    default: true
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
