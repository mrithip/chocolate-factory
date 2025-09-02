import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { useCart } from '../content/CartContext';
import { useAuth } from '../content/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();
  const { user } = useAuth(); // Get user from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/products');
        // For now, just take the first 3 products as featured
        setFeaturedProducts(data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!user || !user.token) {
      toast.warning('Please log in to add items to your cart.');
      navigate('/login'); // Redirect to login page
      return;
    }
    addItem({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading featured chocolates...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Indulge in Chocolate Heaven</h1>
          <p className="text-xl mb-8">Discover the finest chocolates from around the world</p>
          <Link 
            to="/products" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Chocolates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <div key={product._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
              <div className="relative overflow-hidden">
                <Link to={`/product/${product._id}`}>
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                      onError={(e) => {
                        e.target.src = '/placeholder-chocolate.png'; // fallback image
                      }}
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800">
                        View Details
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Status Badges */}
                {product.stock === 0 && (
                  <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs font-semibold shadow-lg border border-red-400/50">
                    OUT OF STOCK
                  </div>
                )}

                {/* Favorite Icon */}
                <button
                  className="absolute top-4 left-4 bg-white/80 hover:bg-white backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle favorite functionality
                  }}
                >
                  <svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Low Stock Badge */}
                {product.stock > 0 && product.stock <= 5 && (
                  <div className="absolute top-4 left-14 bg-orange-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs font-semibold shadow-lg border border-orange-400/50">
                    LOW STOCK
                  </div>
                )}
              </div>
              <div className="p-5">
                <Link to={`/product/${product._id}`}>
                  <h3 className="font-bold text-gray-900 hover:text-indigo-700 transition-colors duration-300 mb-3 text-lg group-hover:text-indigo-600">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 text-sm">{product.description.substring(0, 80)}...</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-indigo-700">₹{product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                      product.stock > 0
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Unavailable'}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-1">
                      {'★'.repeat(Math.floor(product.rating || 4))}
                      {'☆'.repeat(5 - Math.floor(product.rating || 4))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      ({product.reviewCount || 0})
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-semibold text-sm">
                    {product.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Premium Ingredients</h3>
              <p>We use only the finest cocoa beans and natural ingredients</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p>Get your chocolate cravings satisfied with our quick shipping</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Perfect Gifts</h3>
              <p>Beautiful packaging makes our chocolates ideal for gifts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
