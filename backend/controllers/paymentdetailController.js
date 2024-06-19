const PaymentDetail = require('../models/PaymentDetail'); // Assuming your PaymentDetail model is imported

exports.createPaymentDetail = async (req, res) => {
    try {
      const { card_number, expiry, name_on_card } = req.body;
      
      // Check if card_number already exists
      const existingPaymentDetail = await PaymentDetail.findOne({ card_number });
      if (existingPaymentDetail) {
        return res.status(400).json({ status: 'failed', message: 'Card number already exists' });
      }

      const newPaymentDetail = new PaymentDetail({
        card_number,
        expiry,
        name_on_card
      });

      await newPaymentDetail.save();

      res.status(201).json({ status: 'success', data: newPaymentDetail });
    } catch (error) {
      res.status(500).json({ status: 'failed', error: error.message });
    }
  };

exports.getAllPaymentDetails = async (req, res) => {
    try {
        const allPaymentDetails = await PaymentDetail.find({});

        res.status(200).json({
            status: 'success',
            data: allPaymentDetails
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            error: error.message
        });
    }
};
// Update a payment detail by _id
exports.updatePaymentDetailById = async (req, res) => {
    try {
      const { id } = req.params; // Assuming id is passed as a parameter
      const { expiry, name_on_card } = req.body;
  
      const updatedPaymentDetail = await PaymentDetail.findByIdAndUpdate(
        id,
        { expiry, name_on_card },
        { new: true }
      );
  
      if (!updatedPaymentDetail) {
        return res.status(404).json({ status: 'failed', message: 'Payment detail not found' });
      }
  
      res.status(200).json({ status: 'success', data: updatedPaymentDetail });
    } catch (error) {
      res.status(500).json({ status: 'failed', error: error.message });
    }
  };

  
// Delete a payment detail by _id
exports.deletePaymentDetailById = async (req, res) => {
  try {
    const { id } = req.params; // Assuming id is passed as a parameter

    const deletedPaymentDetail = await PaymentDetail.findByIdAndDelete(id);

    if (!deletedPaymentDetail) {
      return res.status(404).json({ status: 'failed', message: 'Payment detail not found' });
    }

    res.status(200).json({ status: 'success', message: 'Payment detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'failed', error: error.message });
  }
};
