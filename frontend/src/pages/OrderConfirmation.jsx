 import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../content/CartContext';
import { useAuth } from '../content/AuthContext'; // Import useAuth
import API from '../utils/api'; // Import API utility

const OrderConfirmation = () => {
  const location = useLocation();
  const { clearCart } = useCart();
  const { user } = useAuth(); // Get user from AuthContext
  const [orderId, setOrderId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // Can be 'success', 'failed', 'pending'
  const [orderDetails, setOrderDetails] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('orderId');
    const status = params.get('status');

    if (id) {
      setOrderId(id);
    }
    if (status) {
      setPaymentStatus(status);
    }

    // Clear cart after successful order
    if (status === 'success') {
      clearCart();
    }

    const fetchOrderDetails = async () => {
      if (!id || authLoading || !user || !user.token) {
        setLoadingOrder(false);
        return;
      }

      try {
        setLoadingOrder(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await API.get(`/orders/${id}`, config);
        setOrderDetails(data);
        setLoadingOrder(false);
      } catch (err) {
        console.error('Failed to fetch order details:', err);
        setOrderError(err.response?.data?.message || err.message);
        setLoadingOrder(false);
      }
    };

    fetchOrderDetails();
  }, [location.search, clearCart, user]); // Add user to dependency array

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {paymentStatus === 'success' ? (
          <div className="text-green-600">
            <svg className="mx-auto h-24 w-24 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-green-800">
              Order Confirmed!
            </h2>
            <p className="mt-2 text-center text-lg text-green-700">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            {orderId && (
              <p className="mt-4 text-center text-md text-green-700">
                Your Order ID: <span className="font-bold">{orderId}</span>
              </p>
            )}

            {loadingOrder ? (
              <p className="mt-4 text-center text-md text-green-700">Fetching order details...</p>
            ) : orderError ? (
              <p className="mt-4 text-center text-md text-red-700">Error fetching order details: {orderError}</p>
            ) : orderDetails && (
              <div className="mt-8 p-4 bg-green-100 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold text-green-800 mb-4">Order Details</h3>
                <div className="space-y-2">
                  {orderDetails.products.map(item => (
                    <div key={item.product._id} className="flex justify-between text-green-700">
                      <span>{item.product.name} x {item.quantity}</span>
                      <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-green-300 pt-4 mt-4 flex justify-between text-lg font-bold text-green-800">
                  <span>Total Amount:</span>
                  <span>₹{orderDetails.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            )}

            {orderId && (
              <div className="mt-6">
                <button
                  onClick={async () => {
                    try {
                      const response = await API.get(`/orders/${orderId}/invoice`, {
                        responseType: 'blob', // Important for downloading files
                      });

                      // Create a download link
                      const url = window.URL.createObjectURL(new Blob([response.data]));
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', `tax-invoice-${orderId}.pdf`);
                      document.body.appendChild(link);
                      link.click();

                      // Clean up
                      link.remove();
                      window.URL.revokeObjectURL(url);
                    } catch (error) {
                      console.error('Failed to download invoice:', error);
                      alert('Failed to download invoice. Please try again.');
                    }
                  }}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Tax Invoice
                </button>
              </div>
            )}
          </div>
        ) : paymentStatus === 'failed' ? (
          <div className="text-red-600">
            <svg className="mx-auto h-24 w-24 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-red-800">
              Payment Failed!
            </h2>
            <p className="mt-2 text-center text-lg text-red-700">
              There was an issue processing your payment. Please try again.
            </p>
          </div>
        ) : (
          <div className="text-blue-600">
            <svg className="mx-auto h-24 w-24 text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12c0 4.418 3.582 8 8 8s8-3.582 8-8S16.418 4 12 4c-1.112 0-2.172.235-3.107.654M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-800">
              Processing Your Order...
            </h2>
            <p className="mt-2 text-center text-lg text-blue-700">
              Please wait while we confirm your payment.
            </p>
          </div>
        )}
        
        <div className="mt-8">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
