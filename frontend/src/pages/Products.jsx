// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../content/CartContext';
import API from '../utils/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

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
    addItem(productWithFullImageUrlAndId, 1); // Pass product and quantity (always 1 from this page)
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-brown-900 mb-8">Our Chocolate Collection</h1>
      
      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => filterProducts(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100 text-brown-700 hover:bg-amber-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-brown-700">Sort by:</label>
          <select 
            value={sortBy}
            onChange={(e) => sortProducts(e.target.value)}
            className="border border-brown-300 rounded px-3 py-2"
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
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Link to={`/product/${product._id}`}>
              <img 
                src={`http://localhost:5000${product.image}`} 
                alt={product.name} 
                className="w-full h-48 object-cover" 
              />
            </Link>
            <div className="p-4">
              <Link to={`/product/${product._id}`}>
                <h3 className="text-xl font-semibold text-brown-900 hover:text-amber-700 mb-2">
                  {product.name}
                </h3>
              </Link>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-amber-700">${product.price}</span>
                <div className="flex text-amber-400">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
              </div>
              <span className="inline-block bg-amber-100 text-amber-800 text-sm px-2 py-1 rounded mb-3">
                {product.category}
              </span>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-brown-800 text-white py-2 rounded hover:bg-brown-900 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
