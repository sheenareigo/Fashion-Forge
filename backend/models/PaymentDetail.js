const mongoose = require('mongoose');

const paymentDetailSchema = new mongoose.Schema({
  card_number: {
    type: Number,
    required: true,
    unique: true 
  },
  expiry: {
    type: Number,
    required: true
  },
  name_on_card: {
    type: String,
    required: true
  }
});

const PaymentDetail = mongoose.model('PaymentDetail', paymentDetailSchema);

module.exports = PaymentDetail;
