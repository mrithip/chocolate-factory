import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/orders/myorders');
        setOrders(data);
      } catch (error) {
        toast.error('Failed to load orders');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
                <p className="text-gray-500">You haven't placed any orders yet. Start shopping!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-red-500 text-white p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
                        <p className="text-amber-100">Status: <span className="font-medium capitalize">{order.status}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">₹{order.totalAmount}</p>
                        <p className="text-amber-100 text-sm">Total Amount</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h4>
                    <div className="space-y-4">
                      {order.products.map((item) => (
                        <div key={item._id} className="flex items-center space-x-4 border-b border-gray-100 pb-4 last:border-b-0">
                          <img
                            src={`http://localhost:5000${item.product.image}`}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="text-lg font-medium text-gray-800">{item.product.name}</h5>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-amber-600">₹{item.product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 px-6 py-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Order Date: {new Date(order.createdAt).toLocaleDateString()}
                        {order.paymentId && (
                          <span className="ml-4">Payment ID: {order.paymentId}</span>
                        )}
                      </p>
                      <button
                        onClick={async () => {
                          try {
                            const response = await API.get(`/orders/${order._id}/invoice`, {
                              responseType: 'blob',
                            });

                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', `tax-invoice-${order._id}.pdf`);
                            document.body.appendChild(link);
                            link.click();
                            link.remove();
                            window.URL.revokeObjectURL(url);

                            toast.success('Invoice downloaded successfully!');
                          } catch (error) {
                            console.error('Failed to download invoice:', error);
                            toast.error('Failed to download invoice. Please try again.');
                          }
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Invoice
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
