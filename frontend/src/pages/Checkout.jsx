// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../content/CartContext';
import { useAuth } from '../content/AuthContext';
import API from '../utils/api';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (order) => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID
      amount: order.amount,
      currency: order.currency,
      name: 'Chocolate Factory',
      description: 'Purchase Chocolates',
      order_id: order.id,
      handler: async function (response) {
        try {
          setLoading(true);
          const { data } = await API.post('/payment/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order.receipt, // This is our backend order ID
          });

          if (data.message === 'Payment successful') {
            navigate(`/order-confirmation?orderId=${data.orderId}&status=success`);
          } else {
            navigate(`/order-confirmation?status=failed`);
          }
          clearCart();
        } catch (err) {
          setError(err.response?.data?.message || err.message);
          navigate(`/order-confirmation?status=failed`);
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: customerInfo.name,
        email: customerInfo.email,
      },
      theme: {
        color: '#78350F', // Brown color
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setError('Please login to proceed with checkout.');
      setLoading(false);
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      setLoading(false);
      return;
    }

    // Basic form validation
    for (const key in customerInfo) {
      if (!customerInfo[key]) {
        setError(`Please fill in your ${key}.`);
        setLoading(false);
        return;
      }
    }

    try {
      // 1. Create an order on your backend
      const orderItems = cartItems.map(item => ({
        product: item._id, // Assuming product has _id from backend
        quantity: item.quantity,
      }));

      const { data: backendOrder } = await API.post('/orders', {
        orderItems,
        totalAmount: getCartTotal(),
      });

      // 2. Create a Razorpay order
      const { data: razorpayOrder } = await API.post('/payment/orders', {
        amount: getCartTotal(),
        currency: 'INR', // Or your desired currency
        receipt: backendOrder._id, // Use your backend order ID as receipt
      });

      // 3. Display Razorpay checkout
      await displayRazorpay(razorpayOrder);

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-brown-900 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-brown-900 mb-6">Customer Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-brown-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-brown-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-brown-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-brown-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-brown-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                required
                className="w-full border border-brown-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-brown-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-brown-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-brown-700 mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={customerInfo.zip}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-brown-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Pay with Razorpay - ₹${getCartTotal().toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-amber-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-brown-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-amber-200 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
