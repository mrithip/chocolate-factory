import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { useCart } from '../content/CartContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

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
    addItem({ ...product, quantity: 1 });
    alert(`${product.name} added to cart!`);
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
      <section className="bg-amber-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Indulge in Chocolate Heaven</h1>
          <p className="text-xl mb-8">Discover the finest chocolates from around the world</p>
          <Link 
            to="/products" 
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">Featured Chocolates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <Link to={`/product/${product._id}`}>
                <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full h-56 object-cover" />
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description.substring(0, 70)}...</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-700">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-900 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-brown-900">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">Premium Ingredients</h3>
              <p>We use only the finest cocoa beans and natural ingredients</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p>Get your chocolate cravings satisfied with our quick shipping</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">💝</div>
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
