// src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../content/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[50vh] flex flex-col justify-center text-center">
        <div className="flex-grow flex items-center justify-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious chocolates to your cart!</p>
            <Link
              to="/products"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh]">
      <div className="flex flex-col" style={{ minHeight: 'calc(80vh - 8rem)' }}>
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

          <div className="flex flex-col lg:flex-row gap-8 pb-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              {cartItems.map(item => (
                <div key={item._id} className="flex items-center border-b border-gray-300 py-6">
                  <div className="w-20 h-20 mr-4">
                    <img
                      src={`http://localhost:5000${item.product.image}`}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        e.target.src = '/placeholder-chocolate.png'; // fallback image
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                    <p className="text-indigo-600 font-bold">₹{item.product.price}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-red-600 hover:text-red-800 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 mt-4"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg h-fit">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-2 mb-6">
                {cartItems.map(item => (
                  <div key={item.product._id} className="flex justify-between">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block w-full text-center text-indigo-600 hover:text-indigo-700 mt-3"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
