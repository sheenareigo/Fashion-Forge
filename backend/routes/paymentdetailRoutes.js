const express = require('express');
const router = express.Router();
const { getAllPaymentDetails, createPaymentDetail, updatePaymentDetailById, deletePaymentDetailById} = require('../controllers/paymentdetailController');

router.route('/').get(getAllPaymentDetails);
router.route('/').post(createPaymentDetail);
router.route('/:id').put(updatePaymentDetailById);
router.route('/:id').delete(deletePaymentDetailById);

module.exports = router;
