const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');
const Order = require('../models/Order');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payment/orders
// @access  Private
router.post('/orders', protect, asyncHandler(async (req, res) => {
  const { amount, currency, receipt } = req.body;

  const options = {
    amount: amount * 100, // amount in smallest currency unit (paise)
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error('Failed to create Razorpay order');
  }
}));

// @desc    Verify Razorpay payment
// @route   POST /api/payment/verify
// @access  Private
router.post('/verify', protect, asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const crypto = require('crypto');
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
                                  .update(body.toString())
                                  .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Update order status in DB
    const order = await Order.findById(orderId);
    if (order) {
      order.status = 'paid';
      order.paymentId = razorpay_payment_id;
      await order.save();
      res.json({ message: 'Payment successful', orderId: order._id });
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } else {
    res.status(400);
    throw new Error('Payment verification failed');
  }
}));

module.exports = router;
