const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image_url: {
    type: String,
    required: true,
    unique: true,
  },
  mini_image_url: {
    type: String,
    required: true
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
