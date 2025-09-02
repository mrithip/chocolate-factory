// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../content/CartContext';
import { useAuth } from '../content/AuthContext'; // Import useAuth
import API from '../utils/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();
  const { user } = useAuth(); // Get user from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/products');
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', 'Dark Chocolate', 'Milk Chocolate', 'White Chocolate', 'Gift Boxes'];

  const filterProducts = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  const sortProducts = (criteria) => {
    setSortBy(criteria);
    const sorted = [...filteredProducts].sort((a, b) => {
      if (criteria === 'price') return a.price - b.price;
      if (criteria === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });
    setFilteredProducts(sorted);
  };

  const handleAddToCart = (product) => {
    // Ensure the product has an 'id' property for CartContext, using '_id' from MongoDB
    // Also ensure the image URL is a full URL for consistent display in cart
    const productWithFullImageUrlAndId = {
      ...product,
      id: product._id, // Keep id for local state consistency if needed, though _id is primary
      image: `http://localhost:5000${product.image}`
    };
    if (!user || !user.token) {
      toast.warning('Please log in to add items to your cart.');
      navigate('/login'); // Redirect to login page
      return;
    }
    addItem(productWithFullImageUrlAndId, 1); // Pass product and quantity (always 1 from this page)
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Chocolate Collection</h1>
      
      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => filterProducts(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-gray-700">Sort by:</label>
          <select 
            value={sortBy}
            onChange={(e) => sortProducts(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
            <div className="relative overflow-hidden">
              <Link to={`/product/${product._id}`}>
                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
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
                <h3 className="font-bold text-gray-900 hover:text-indigo-700 transition-colors duration-300 mb-3 text-lg line-clamp-2 group-hover:text-indigo-600">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-indigo-700">₹{product.price.toFixed(2)}</span>
                <div className="flex text-yellow-400 mr-1">
                  {'★'.repeat(Math.floor(product.rating || 4))}
                  {'☆'.repeat(5 - Math.floor(product.rating || 4))}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-semibold text-sm">
                  {product.category}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  ({product.reviewCount || 0} reviews)
                </span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                className={`w-full py-3 px-4 rounded-full font-medium text-sm transition-all duration-300 ${
                  product.stock > 0
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
