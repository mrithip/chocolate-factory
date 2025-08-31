import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../content/AuthContext';
import { useCart } from '../content/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-brown-800 text-black sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-amber-300 flex items-center">
          <span className="mr-2">🍫</span> Chocolate Delight
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-amber-200 transition">Home</Link>
          <Link to="/products" className="hover:text-amber-200 transition">Products</Link>
          <Link to="/cart" className="hover:text-amber-200 transition">Cart ({cartCount})</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              <button 
                onClick={logout}
                className="bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-amber-200 transition">Login</Link>
              <Link 
                to="/register" 
                className="bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;