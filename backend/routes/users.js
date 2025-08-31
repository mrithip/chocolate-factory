const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware'); // Import protect middleware

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
}));

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
}));

// @desc    Get user cart
// @route   GET /api/users/cart
// @access  Private
router.get('/cart', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  if (user) {
    res.json(user.cart);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
}));

// @desc    Add or update item in user cart
// @route   POST /api/users/cart
// @access  Private
router.post('/cart', protect, asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    const itemIndex = user.cart.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      // Item exists, update quantity
      user.cart[itemIndex].quantity = quantity;
    } else {
      // Item does not exist, add new item
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    // Populate product details for the response
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    res.status(200).json(updatedUser.cart);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
}));

// @desc    Remove item from user cart
// @route   DELETE /api/users/cart/:productId
// @access  Private
router.delete('/cart/:productId', protect, asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id);

  if (user) {
    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    await user.save();
    // Populate product details for the response
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    res.status(200).json(updatedUser.cart);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
}));

// @desc    Clear user cart
// @route   DELETE /api/users/cart
// @access  Private
router.delete('/cart', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.cart = [];
    await user.save();
    res.status(200).json([]); // Return empty cart
  } else {
    res.status(404);
    throw new Error('User not found');
  }
}));

module.exports = router;
