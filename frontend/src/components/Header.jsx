import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../content/AuthContext';
import { useCart } from '../content/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-indigo-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="text-3xl font-bold flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <div className="bg-white text-amber-700 p-2 rounded-full shadow-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider drop-shadow-lg">CHOCOLATE</span>
              <span className="text-sm font-medium tracking-widest -mt-1">FACTORY</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link
              to="/"
              className="text-lg font-semibold hover:text-amber-200 transition-all duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/products"
              className="text-lg font-semibold hover:text-amber-200 transition-all duration-300 relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/cart"
              className="text-lg font-semibold hover:text-amber-200 transition-all duration-300 relative group flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13v6a2 2 0 002 2h4a2 2 0 002-2v-3m-4 3h8a2 2 0 002-2v-3" />
              </svg>
              <span>
                Cart
                {cartCount > 0 && (
                  <span className="ml-1 bg-amber-300 text-amber-900 px-2 py-0.5 rounded-full text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </span>
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium hidden md:block">
                  Welcome, <span className="font-bold text-amber-200">{user.name}</span>
                </span>
                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-lg font-semibold hover:text-amber-200 transition-all duration-300 hidden sm:block"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden mt-4 pt-4 border-t border-white/20">
          <nav className="flex justify-center space-x-6">
            <Link to="/" className="text-lg font-semibold hover:text-amber-200 transition">Home</Link>
            <Link to="/products" className="text-lg font-semibold hover:text-amber-200 transition">Products</Link>
            <Link to="/cart" className="text-lg font-semibold hover:text-amber-200 transition flex items-center space-x-2">
              <span>Cart ({cartCount})</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
