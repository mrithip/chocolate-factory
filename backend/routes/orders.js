const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const PDFDocument = require('pdfkit');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
  const { orderItems, totalAmount, paymentId } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      user: req.user._id,
      products: orderItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
      })),
      totalAmount,
      paymentId,
      status: paymentId ? 'paid' : 'pending', // Set status based on paymentId presence
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
}));

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protect, asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('products.product', 'name image price').sort({ createdAt: -1 });
  res.json(orders);
}));

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email').populate('products.product', 'name image price');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
}));

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.put('/:id/pay', protect, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = 'paid';
    order.paymentId = req.body.paymentId || order.paymentId; // Update paymentId if provided

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
}));

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
}));

// @desc    Download tax invoice PDF
// @route   GET /api/orders/:id/invoice
// @access  Private
router.get('/:id/invoice', protect, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email').populate('products.product', 'name price');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Check if user owns this order
  if (order.user._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Access denied');
  }

  // Create PDF document
  const doc = new PDFDocument({ margin: 50 });

  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=tax-invoice-${order._id}.pdf`);

  // Pipe the PDF document to the response
  doc.pipe(res);

  // Header
  doc.fontSize(20).text('CHOCOLATE FACTORY', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text('TAX INVOICE', { align: 'center' });
  doc.moveDown(2);

  // Invoice details - Two column layout
  doc.fontSize(12);
  const detailsY = doc.y;

  // Left column - Labels
  doc.text('Invoice Number:', 50, detailsY);
  doc.text('Invoice Date:', 50, detailsY + 20);
  doc.text('Order Date:', 50, detailsY + 40);

  // Right column - Values
  const shortOrderId = order._id.toString().substring(0, 16) + '...';
  doc.text(shortOrderId, 150, detailsY);
  doc.text(new Date(order.createdAt).toLocaleDateString(), 150, detailsY + 20);
  doc.text(new Date(order.createdAt).toLocaleDateString(), 150, detailsY + 40);

  // Bill To section
  doc.moveDown(4);
  doc.fontSize(14).text('Bill To:', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12);
  doc.text(`Customer Name: ${order.user.name}`);
  doc.text(`Customer Email: ${order.user.email}`);
  doc.moveDown(2);

  // Products table
  doc.fontSize(14).text('Order Details', { underline: true });
  doc.moveDown(0.5);

  // Table setup
  const tableY = doc.y;
  const leftMargin = 50;
  const colPositions = [leftMargin, leftMargin + 200, leftMargin + 270, leftMargin + 340, leftMargin + 400];

  // Table headers with proper alignment
  doc.fontSize(11);
  doc.text('Product Name', colPositions[0], tableY);
  doc.text('Qty', colPositions[1], tableY, { align: 'center', width: 60 });
  doc.text('Price', colPositions[2], tableY, { align: 'right', width: 60 });
  doc.text('Total', colPositions[3], tableY, { align: 'right', width: 60 });

  // Header separator line
  doc.moveTo(leftMargin, tableY + 15).lineTo(colPositions[4], tableY + 15).stroke();

  // Table rows
  let rowY = tableY + 25;
  doc.fontSize(10);

  order.products.forEach((item, index) => {
    const y = rowY + (index * 20);

    // Alternating row background
    if (index % 2 === 0) {
      doc.rect(leftMargin - 5, y - 5, 365, 18).fill('#f8f9fa');
    }

    // Product details
    doc.fillColor('black');
    doc.text(item.product.name, colPositions[0], y, { width: 180 });
    doc.text(item.quantity.toString(), colPositions[1], y, { align: 'center', width: 60 });
    doc.text(`₹${item.product.price}`, colPositions[2], y, { align: 'right', width: 60 });
    doc.text(`₹${(item.product.price * item.quantity).toFixed(2)}`, colPositions[3], y, { align: 'right', width: 60 });
  });

  // Totals section
  const totalsY = rowY + (order.products.length * 20) + 20;
  doc.moveDown(2);
  doc.moveDown();

  // Calculate GST (assuming 18%)
  const subtotal = order.totalAmount / 1.18;
  const gstAmount = order.totalAmount - subtotal;

  doc.fontSize(12);
  doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 350, totalsY, { align: 'right' });
  doc.text(`GST (18%): ₹${gstAmount.toFixed(2)}`, 350, totalsY + 20, { align: 'right' });
  doc.moveTo(300, totalsY + 35).lineTo(500, totalsY + 35).stroke();
  doc.font('Helvetica-Bold').fontSize(14);
  doc.text(`Total: ₹${order.totalAmount.toFixed(2)}`, 350, totalsY + 45, { align: 'right' });

  // Payment info
  doc.moveDown(3);
  doc.font('Helvetica').fontSize(12);
  doc.text(`Payment Status: ${order.status.toUpperCase()}`);
  if (order.paymentId) {
    doc.text(`Payment ID: ${order.paymentId}`);
  }

  // Footer
  doc.moveDown(3);
  doc.fontSize(10).text('Thank you for your business!', { align: 'center' });
  doc.text('Chocolate Factory - Premium Chocolates', { align: 'center' });

  // Finalize PDF
  doc.end();
}));

module.exports = router;
